import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from './logger';

const KEYS = {
  HIGH_SCORE: '@high_score',
  GAMES_PLAYED: '@games_played',
  GAME_STATE: '@game_state',
  DAILY_STREAK: '@daily_streak',
  LAST_PLAYED_DATE: '@last_played_date',
  PLAYER_LEVEL: '@player_level',
  TOTAL_EXP: '@total_exp',
  GAME_MODE: '@game_mode',
  MODE_STATS: '@mode_stats',
  TUTORIAL_COMPLETED: '@tutorial_completed',
};

const validateGameState = (state) => {
  return state && 
    Array.isArray(state.grid) && 
    typeof state.score === 'number' &&
    typeof state.highScore === 'number';
};

export const saveScore = async (score) => {
  try {
    await AsyncStorage.setItem(KEYS.HIGH_SCORE, score.toString());
  } catch (error) {
    Logger.error('Storage', 'Error saving score', error);
  }
};

export const getHighScore = async () => {
  try {
    const score = await AsyncStorage.getItem(KEYS.HIGH_SCORE);
    return score ? parseInt(score, 10) : 0;
  } catch (error) {
    Logger.error('Storage', 'Error loading score', error);
    return 0;
  }
};

export const saveGamesPlayed = async (count) => {
  try {
    await AsyncStorage.setItem(KEYS.GAMES_PLAYED, count.toString());
  } catch (error) {
    Logger.error('Storage', 'Error saving games played', error);
  }
};

export const getGamesPlayed = async () => {
  try {
    const count = await AsyncStorage.getItem(KEYS.GAMES_PLAYED);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    Logger.error('Storage', 'Error loading games played', error);
    return 0;
  }
};

export const saveGameState = async (state) => {
  try {
    const jsonState = JSON.stringify(state);
    await AsyncStorage.setItem(KEYS.GAME_STATE, jsonState);
  } catch (error) {
    Logger.error('Storage', 'Error saving game state', error);
  }
};

export const loadGameState = async () => {
  try {
    const jsonState = await AsyncStorage.getItem(KEYS.GAME_STATE);
    if (!jsonState) return null;
    const state = JSON.parse(jsonState);
    return validateGameState(state) ? state : null;
  } catch (error) {
    Logger.error('Storage', 'Error loading game state', error);
    return null;
  }
};

export const updateDailyStreak = async () => {
  try {
    const today = new Date().toDateString();
    const lastPlayedDate = await AsyncStorage.getItem(KEYS.LAST_PLAYED_DATE);
    const currentStreak = await AsyncStorage.getItem(KEYS.DAILY_STREAK);
    const streak = currentStreak ? parseInt(currentStreak, 10) : 0;

    if (lastPlayedDate === today) {
      return streak;
    }

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newStreak = lastPlayedDate === yesterday ? streak + 1 : 1;

    await AsyncStorage.setItem(KEYS.DAILY_STREAK, newStreak.toString());
    await AsyncStorage.setItem(KEYS.LAST_PLAYED_DATE, today);
    return newStreak;
  } catch (error) {
    Logger.error('Storage', 'Error updating daily streak', error);
    return 0;
  }
};

export const getDailyStreak = async () => {
  try {
    const streak = await AsyncStorage.getItem(KEYS.DAILY_STREAK);
    return streak ? parseInt(streak, 10) : 0;
  } catch (error) {
    Logger.error('Storage', 'Error loading daily streak', error);
    return 0;
  }
};

export const savePlayerLevel = async (level, totalExp) => {
  try {
    await AsyncStorage.setItem(KEYS.PLAYER_LEVEL, level.toString());
    await AsyncStorage.setItem(KEYS.TOTAL_EXP, totalExp.toString());
  } catch (error) {
    Logger.error('Storage', 'Error saving player level', error);
  }
};

export const getPlayerLevel = async () => {
  try {
    const level = await AsyncStorage.getItem(KEYS.PLAYER_LEVEL);
    const totalExp = await AsyncStorage.getItem(KEYS.TOTAL_EXP);
    return {
      level: level ? parseInt(level, 10) : 1,
      totalExp: totalExp ? parseInt(totalExp, 10) : 0,
    };
  } catch (error) {
    Logger.error('Storage', 'Error loading player level', error);
    return { level: 1, totalExp: 0 };
  }
};

export const saveModeStats = async (stats) => {
  try {
    await AsyncStorage.setItem(KEYS.MODE_STATS, JSON.stringify(stats));
  } catch (error) {
    Logger.error('Storage', 'Error saving mode stats', error);
  }
};

export const getModeStats = async () => {
  try {
    const stats = await AsyncStorage.getItem(KEYS.MODE_STATS);
    return stats ? JSON.parse(stats) : { timeAttack: {}, survival: {}, limitedMoves: {} };
  } catch (error) {
    Logger.error('Storage', 'Error loading mode stats', error);
    return { timeAttack: {}, survival: {}, limitedMoves: {} };
  }
};

export const markTutorialComplete = async () => {
  try {
    await AsyncStorage.setItem(KEYS.TUTORIAL_COMPLETED, 'true');
  } catch (error) {
    Logger.error('Storage', 'Error marking tutorial complete', error);
  }
};

export const isTutorialCompleted = async () => {
  try {
    const completed = await AsyncStorage.getItem(KEYS.TUTORIAL_COMPLETED);
    return completed === 'true';
  } catch (error) {
    Logger.error('Storage', 'Error checking tutorial status', error);
    return false;
  }
};
