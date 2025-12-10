import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from './logger';

const ACHIEVEMENT_KEY = '@achievements';

export const achievements = {
  score_1000: {
    id: 'score_1000',
    title: 'Score 1000',
    description: 'Reach a score of 1000 in a single game.',
    unlocked: false,
  },
  score_5000: {
    id: 'score_5000',
    title: 'Score 5000',
    description: 'Reach a score of 5000 in a single game.',
    unlocked: false,
  },
  lines_10: {
    id: 'lines_10',
    title: 'Clear 10 lines',
    description: 'Clear 10 lines in total.',
    unlocked: false,
  },
  lines_100: {
    id: 'lines_100',
    title: 'Clear 100 lines',
    description: 'Clear 100 lines in total.',
    unlocked: false,
  },
  games_10: {
    id: 'games_10',
    title: 'Play 10 games',
    description: 'Play 10 games.',
    unlocked: false,
  },
};

export const getAchievements = async () => {
  try {
    const jsonAchievements = await AsyncStorage.getItem(ACHIEVEMENT_KEY);
    return jsonAchievements ? JSON.parse(jsonAchievements) : achievements;
  } catch (error) {
    Logger.error('Achievements', 'Error loading achievements', error);
    return achievements;
  }
};

export const saveAchievements = async (updatedAchievements) => {
  try {
    await AsyncStorage.setItem(ACHIEVEMENT_KEY, JSON.stringify(updatedAchievements));
  } catch (error) {
    Logger.error('Achievements', 'Error saving achievements', error);
  }
};
