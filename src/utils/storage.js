import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from './logger';

const KEYS = {
  HIGH_SCORE: '@high_score',
  GAMES_PLAYED: '@games_played',
  GAME_STATE: '@game_state',
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
