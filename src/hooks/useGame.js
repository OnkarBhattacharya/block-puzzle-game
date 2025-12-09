import { useState, useEffect } from 'react';
import { Vibration } from 'react-native';
import { getRandomBlock } from '../utils/blocks';
import { saveScore, getHighScore, saveGameState, loadGameState } from '../utils/storage';
import SoundManager from '../services/SoundManager';
import AdManager from '../services/AdManager';

import { achievements as achievementsList, getAchievements, saveAchievements } from '../utils/achievements';
import { getDailyChallenge } from '../utils/challenges';

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
    }
  };

  const handleUseShuffle = () => {
      if (shuffleCount > 0) {
          generateNewBlocks();
          setShuffleCount(prev => prev - 1);
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

  const checkAchievements = (newScore, linesCleared) => {
    const newAchievements = { ...achievements };
    if (newScore >= 1000 && !newAchievements.score_1000.unlocked) {
      newAchievements.score_1000.unlocked = true;
    }
    if (newScore >= 5000 && !newAchievements.score_5000.unlocked) {
      newAchievements.score_5000.unlocked = true;
    }
    if (totalLinesCleared + linesCleared >= 10 && !newAchievements.lines_10.unlocked) {
        newAchievements.lines_10.unlocked = true;
    }
    if (totalLinesCleared + linesCleared >= 100 && !newAchievements.lines_100.unlocked) {
        newAchievements.lines_100.unlocked = true;
    }
    if (gamesPlayed + 1 >= 10 && !newAchievements.games_10.unlocked) {
        newAchievements.games_10.unlocked = true;
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

    if (newGamesPlayed % 3 === 0) {
      AdManager.showInterstitial();
    }

    checkAchievements(score, 0);
    updateDailyChallengeProgress('games', 1);
    await saveGameState(null);
  };

  const handleBlockPlaced = (linesCleared) => {
    if (soundEnabled) SoundManager.playSound('place');
    if (hapticsEnabled) Vibration.vibrate(50);
    setHistory([...history, { grid, score, combo: comboMultiplier }]);



    const remainingBlocks = previewBlocks.slice(1);
    if (remainingBlocks.length === 0) {
      generateNewBlocks();
    } else {
      const newBlocks = [...remainingBlocks, getRandomBlock()];
      setPreviewBlocks(newBlocks);
      setActiveBlock(newBlocks[0]);
    }
    checkAchievements(score, linesCleared);
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
      setScore(score + 50);

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
    watchAdForContinue
  };
};
