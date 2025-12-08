import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  HIGH_SCORE: '@high_score',
  GAMES_PLAYED: '@games_played',
  GAME_STATE: '@game_state',
};

export const saveScore = async (score) => {
  try {
    await AsyncStorage.setItem(KEYS.HIGH_SCORE, score.toString());
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

export const getHighScore = async () => {
  try {
    const score = await AsyncStorage.getItem(KEYS.HIGH_SCORE);
    return score ? parseInt(score, 10) : 0;
  } catch (error) {
    console.error('Error loading score:', error);
    return 0;
  }
};

export const saveGamesPlayed = async (count) => {
  try {
    await AsyncStorage.setItem(KEYS.GAMES_PLAYED, count.toString());
  } catch (error) {
    console.error('Error saving games played:', error);
  }
};

export const getGamesPlayed = async () => {
  try {
    const count = await AsyncStorage.getItem(KEYS.GAMES_PLAYED);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error('Error loading games played:', error);
    return 0;
  }
};

export const saveGameState = async (state) => {
    try {
        const jsonState = JSON.stringify(state);
        await AsyncStorage.setItem(KEYS.GAME_STATE, jsonState);
    } catch (error) {
        console.error('Error saving game state:', error);
    }
};

export const loadGameState = async () => {
    try {
        const jsonState = await AsyncStorage.getItem(KEYS.GAME_STATE);
        return jsonState ? JSON.parse(jsonState) : null;
    } catch (error) {
        console.error('Error loading game state:', error);
        return null;
    }
};
