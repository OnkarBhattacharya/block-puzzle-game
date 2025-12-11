import { useState, useEffect } from 'react';
import { Vibration } from 'react-native';
import { getRandomBlock } from '../utils/blocks';
import { saveScore, getHighScore, saveGameState, loadGameState, updateDailyStreak, getDailyStreak, savePlayerLevel, getPlayerLevel, saveModeStats, getModeStats } from '../utils/storage';
import { REWARDS, GAME_CONFIG } from '../utils/constants';
import SoundManager from '../services/SoundManager';
import AdManager from '../services/AdManager';

import { achievements as achievementsList, getAchievements, saveAchievements } from '../utils/achievements';
import { getDailyChallenge } from '../utils/challenges';
import { calculateLevel, getExpProgress, getStreakMultiplier, MILESTONE_REWARDS, GAME_MODES } from '../utils/progression';

const GRID_SIZE = 8;

export const useGame = (soundEnabled, hapticsEnabled) => {
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0)));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [activeBlock, setActiveBlock] = useState(null);
  const [previewBlocks, setPreviewBlocks] = useState([]);
  const [history, setHistory] = useState([]);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [totalLinesCleared, setTotalLinesCleared] = useState(0);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [dailyChallengeProgress, setDailyChallengeProgress] = useState(0);
  const [bombCount, setBombCount] = useState(1);
  const [shuffleCount, setShuffleCount] = useState(1);
  const [isBombActive, setIsBombActive] = useState(false);
  const [achievements, setAchievements] = useState(achievementsList);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [totalExp, setTotalExp] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [gameMode, setGameMode] = useState(GAME_MODES.CLASSIC.id);
  const [modeStats, setModeStats] = useState({ timeAttack: {}, survival: {}, limitedMoves: {} });
  const [powerUpCount, setPowerUpCount] = useState(0);
  const [milestoneMessage, setMilestoneMessage] = useState(null);
  const [movesRemaining, setMovesRemaining] = useState(15);

  const generateNewBlocks = () => {
    const newBlocks = [getRandomBlock(), getRandomBlock(), getRandomBlock()];
    setPreviewBlocks(newBlocks);
    setActiveBlock(newBlocks[0]);
  };

  const handleRotate = () => {
    if (activeBlock) {
      const { shape } = activeBlock;
      const newShape = shape[0].map((_, colIndex) => shape.map(row => row[colIndex]).reverse());
      setActiveBlock({ ...activeBlock, shape: newShape });
    }
  };

  const handleUseBomb = () => {
    if (bombCount > 0) {
        setIsBombActive(true);
        setPowerUpCount(prev => prev + 1);
    }
  };

  const handleUseShuffle = () => {
      if (shuffleCount > 0) {
          generateNewBlocks();
          setShuffleCount(prev => prev - 1);
          setPowerUpCount(prev => prev + 1);
      }
  };

  const handleBombPlacement = (gridX, gridY) => {
    if (isBombActive) {
      const newGrid = grid.map(row => [...row]);
      for (let y = Math.max(0, gridY - 1); y < Math.min(GRID_SIZE, gridY + 2); y++) {
        for (let x = Math.max(0, gridX - 1); x < Math.min(GRID_SIZE, gridX + 2); x++) {
          newGrid[y][x] = 0;
        }
      }
      setGrid(newGrid);
      setBombCount(prev => prev - 1);
      setIsBombActive(false);
    }
  };

  const checkAchievements = (newScore, linesCleared, newLevel = playerLevel, newStreak = dailyStreak, newCombo = comboMultiplier) => {
    const newAchievements = { ...achievements };
    if (newScore >= 1000 && !newAchievements.score_1000.unlocked) {
      newAchievements.score_1000.unlocked = true;
    }
    if (newScore >= 5000 && !newAchievements.score_5000.unlocked) {
      newAchievements.score_5000.unlocked = true;
    }
    if (newScore >= 10000 && !newAchievements.score_10000.unlocked) {
      newAchievements.score_10000.unlocked = true;
    }
    if (totalLinesCleared + linesCleared >= 10 && !newAchievements.lines_10.unlocked) {
        newAchievements.lines_10.unlocked = true;
    }
    if (totalLinesCleared + linesCleared >= 100 && !newAchievements.lines_100.unlocked) {
        newAchievements.lines_100.unlocked = true;
    }
    if (totalLinesCleared + linesCleared >= 500 && !newAchievements.lines_500.unlocked) {
        newAchievements.lines_500.unlocked = true;
    }
    if (gamesPlayed + 1 >= 10 && !newAchievements.games_10.unlocked) {
        newAchievements.games_10.unlocked = true;
    }
    if (gamesPlayed + 1 >= 50 && !newAchievements.games_50.unlocked) {
        newAchievements.games_50.unlocked = true;
    }
    if (newCombo >= 5 && !newAchievements.combo_5.unlocked) {
        newAchievements.combo_5.unlocked = true;
    }
    if (powerUpCount >= 20 && !newAchievements.power_up_master.unlocked) {
        newAchievements.power_up_master.unlocked = true;
    }
    if (newLevel >= 5 && !newAchievements.level_5.unlocked) {
        newAchievements.level_5.unlocked = true;
    }
    if (newLevel >= 10 && !newAchievements.level_10.unlocked) {
        newAchievements.level_10.unlocked = true;
    }
    if (newStreak >= 7 && !newAchievements.streak_7.unlocked) {
        newAchievements.streak_7.unlocked = true;
    }
    setAchievements(newAchievements);
    saveAchievements(newAchievements);
    if(linesCleared > 0) {
        setTotalLinesCleared(totalLinesCleared + linesCleared);
    }
  }

  const updateDailyChallengeProgress = (type, value) => {
      if (dailyChallenge && dailyChallenge.type === type) {
          setDailyChallengeProgress(prev => Math.min(prev + value, dailyChallenge.target));
      }
  }

  const addExperience = (exp) => {
    const newExp = totalExp + exp;
    const newLevel = calculateLevel(newExp);
    setTotalExp(newExp);
    if (newLevel > playerLevel) {
      setPlayerLevel(newLevel);
      savePlayerLevel(newLevel, newExp);
      checkMilestoneReward(newLevel);
    }
  }

  const checkMilestoneReward = (level) => {
    Object.values(MILESTONE_REWARDS).forEach(milestone => {
      if (milestone.level === level) {
        setMilestoneMessage({
          message: milestone.message,
          reward: milestone.reward,
        });
      }
    });
  }

  const handleGameOver = async (continuedWithAd) => {
    if (soundEnabled) SoundManager.playSound('game_over');
    if (hapticsEnabled) Vibration.vibrate([100, 200, 100, 200]);
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      await saveScore(score);
    }

    const newGamesPlayed = gamesPlayed + 1;
    setGamesPlayed(newGamesPlayed);

    const newStreak = await updateDailyStreak();
    setDailyStreak(newStreak);

    const baseExp = Math.floor(score / 100);
    const streakMultiplier = getStreakMultiplier(newStreak);
    const expGain = Math.floor(baseExp * streakMultiplier);
    addExperience(expGain);

    const updatedStats = { ...modeStats };
    if (gameMode === GAME_MODES.TIME_ATTACK.id) {
      updatedStats.timeAttack = { bestScore: Math.max(updatedStats.timeAttack.bestScore || 0, score) };
    } else if (gameMode === GAME_MODES.SURVIVAL.id) {
      updatedStats.survival = { bestScore: Math.max(updatedStats.survival.bestScore || 0, score) };
    } else if (gameMode === GAME_MODES.LIMITED_MOVES.id) {
      updatedStats.limitedMoves = { bestScore: Math.max(updatedStats.limitedMoves.bestScore || 0, score) };
    }
    setModeStats(updatedStats);
    await saveModeStats(updatedStats);

    if (newGamesPlayed % GAME_CONFIG.AD_FREQUENCY === 0) {
      AdManager.showInterstitial();
    }

    checkAchievements(score, 0, calculateLevel(totalExp + expGain), newStreak, comboMultiplier);
    updateDailyChallengeProgress('games', 1);
    await saveGameState(null);
  };

  const handleBlockPlaced = (linesCleared) => {
    if (soundEnabled) SoundManager.playSound('place');
    if (hapticsEnabled) Vibration.vibrate(50);
    setHistory(prev => [...prev, { grid, score, combo: comboMultiplier }]);

    if (gameMode === GAME_MODES.LIMITED_MOVES.id) {
      setMovesRemaining(prev => prev - 1);
    }

    setPreviewBlocks(prev => {
      const remainingBlocks = prev.slice(1);
      if (remainingBlocks.length === 0) {
        generateNewBlocks();
        return prev;
      }
      const newBlocks = [...remainingBlocks, getRandomBlock()];
      setActiveBlock(newBlocks[0]);
      return newBlocks;
    });

    checkAchievements(score, linesCleared, playerLevel, dailyStreak, comboMultiplier);
    if (linesCleared > 0) {
      updateDailyChallengeProgress('lines', linesCleared);
    }
    updateDailyChallengeProgress('score', score);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      if (soundEnabled) SoundManager.playSound('undo');
      if (hapticsEnabled) Vibration.vibrate(50);
      const lastState = history[history.length - 1];
      setGrid(lastState.grid);
      setScore(lastState.score);
      setComboMultiplier(lastState.combo || 1);
      setHistory(history.slice(0, history.length - 1));
    }
  };

  const watchAdForContinue = () => {
    AdManager.showRewarded(() => {
      setGameOver(false);
      setScore(score + REWARDS.CONTINUE_BONUS);

    });
  };

  const resetGame = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0)));
    setScore(0);
    setGameOver(false);
    setHistory([]);
    setComboMultiplier(1);
    generateNewBlocks();
    setDailyChallengeProgress(0);
    setBombCount(1);
    setShuffleCount(1);
    setMovesRemaining(15);
    setMilestoneMessage(null);
    saveGameState(null);
  };

  const loadGame = async () => {
    const savedState = await loadGameState();
    if (savedState) {
      setGrid(savedState.grid);
      setScore(savedState.score);
      setHighScore(savedState.highScore);
      setGamesPlayed(savedState.gamesPlayed);
      setActiveBlock(savedState.activeBlock);
      setPreviewBlocks(savedState.previewBlocks);
      setHistory(savedState.history || []);
      setComboMultiplier(savedState.comboMultiplier || 1);
      setTotalLinesCleared(savedState.totalLinesCleared || 0);
      setDailyChallengeProgress(savedState.dailyChallengeProgress || 0);
      setAchievements(savedState.achievements || achievementsList);
      setBombCount(savedState.bombCount || 0);
      setShuffleCount(savedState.shuffleCount || 0);
    } else {
        const savedHighScore = await getHighScore();
        setHighScore(savedHighScore);
        const loadedAchievements = await getAchievements();
        setAchievements(loadedAchievements);
        generateNewBlocks();
    }
    const levelData = await getPlayerLevel();
    setPlayerLevel(levelData.level);
    setTotalExp(levelData.totalExp);
    
    const streak = await getDailyStreak();
    setDailyStreak(streak);
    
    const stats = await getModeStats();
    setModeStats(stats);
    
    setDailyChallenge(getDailyChallenge());
  };

  return {
    grid,
    setGrid,
    score,
    setScore,
    highScore,
    gameOver,
    setGameOver,
    gamesPlayed,
    activeBlock,
    setActiveBlock,
    previewBlocks,
    history,
    comboMultiplier,
    setComboMultiplier,
    totalLinesCleared,
    dailyChallenge,
    dailyChallengeProgress,
    bombCount,
    setBombCount,
    shuffleCount,
    setShuffleCount,
    isBombActive,
    setIsBombActive,
    achievements,
    playerLevel,
    setPlayerLevel,
    totalExp,
    setTotalExp,
    dailyStreak,
    setDailyStreak,
    gameMode,
    setGameMode,
    modeStats,
    setModeStats,
    powerUpCount,
    setPowerUpCount,
    milestoneMessage,
    setMilestoneMessage,
    movesRemaining,
    setMovesRemaining,
    generateNewBlocks,
    handleRotate,
    handleUseBomb,
    handleUseShuffle,
    handleBombPlacement,
    handleGameOver,
    handleBlockPlaced,
    handleUndo,
    resetGame,
    loadGame,
    watchAdForContinue,
    addExperience,
    checkMilestoneReward,
    updateDailyChallengeProgress
  };
};
