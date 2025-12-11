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
  score_10000: {
    id: 'score_10000',
    title: 'Score 10000',
    description: 'Reach a score of 10000 in a single game.',
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
  lines_500: {
    id: 'lines_500',
    title: 'Clear 500 lines',
    description: 'Clear 500 lines in total.',
    unlocked: false,
  },
  games_10: {
    id: 'games_10',
    title: 'Play 10 games',
    description: 'Play 10 games.',
    unlocked: false,
  },
  games_50: {
    id: 'games_50',
    title: 'Play 50 games',
    description: 'Play 50 games.',
    unlocked: false,
  },
  combo_5: {
    id: 'combo_5',
    title: 'Combo Master',
    description: 'Achieve a combo multiplier of 5x.',
    unlocked: false,
  },
  power_up_master: {
    id: 'power_up_master',
    title: 'Power Up Master',
    description: 'Use 20 power-ups in total.',
    unlocked: false,
  },
  daily_challenge: {
    id: 'daily_challenge',
    title: 'Daily Driver',
    description: 'Complete a daily challenge.',
    unlocked: false,
  },
  level_5: {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reach level 5.',
    unlocked: false,
  },
  level_10: {
    id: 'level_10',
    title: 'Veteran Player',
    description: 'Reach level 10.',
    unlocked: false,
  },
  streak_7: {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Achieve a 7-day play streak.',
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
