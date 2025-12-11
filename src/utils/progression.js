export const LEVEL_CONFIG = {
  expPerLevel: 500,
  maxLevel: 50,
};

export const calculateLevel = (totalExp) => {
  const level = Math.floor(totalExp / LEVEL_CONFIG.expPerLevel) + 1;
  return Math.min(level, LEVEL_CONFIG.maxLevel);
};

export const calculateExpForNextLevel = (currentLevel) => {
  return currentLevel * LEVEL_CONFIG.expPerLevel;
};

export const getExpProgress = (totalExp) => {
  const currentLevel = calculateLevel(totalExp);
  const currentLevelExp = (currentLevel - 1) * LEVEL_CONFIG.expPerLevel;
  const nextLevelExp = currentLevel * LEVEL_CONFIG.expPerLevel;
  const progressInLevel = totalExp - currentLevelExp;
  const expNeededForLevel = nextLevelExp - currentLevelExp;
  return {
    level: currentLevel,
    progress: progressInLevel,
    needed: expNeededForLevel,
    percentage: (progressInLevel / expNeededForLevel) * 100,
  };
};

export const GAME_MODES = {
  CLASSIC: {
    id: 'classic',
    name: 'Classic',
    description: 'Play until no moves available',
    icon: '🎮',
  },
  TIME_ATTACK: {
    id: 'timeAttack',
    name: 'Time Attack',
    description: 'Score as much as possible in 60 seconds',
    icon: '⏱️',
    duration: 60,
  },
  SURVIVAL: {
    id: 'survival',
    name: 'Survival',
    description: 'Clear lines to survive longer',
    icon: '💪',
  },
  LIMITED_MOVES: {
    id: 'limitedMoves',
    name: 'Limited Moves',
    description: 'Complete with only 15 moves',
    icon: '🎯',
    moves: 15,
  },
};

export const MILESTONE_REWARDS = {
  level_1: { level: 1, reward: 100, message: 'Welcome to GridLock!' },
  level_5: { level: 5, reward: 500, message: 'Nice Progress! +500 points' },
  level_10: { level: 10, reward: 1000, message: 'You\'re a Pro! +1000 points' },
  level_20: { level: 20, reward: 2500, message: 'Incredible! +2500 points' },
  level_50: { level: 50, reward: 5000, message: 'Max Level! +5000 points' },
};

export const DAILY_STREAK_REWARDS = [
  { days: 1, multiplier: 1 },
  { days: 3, multiplier: 1.1 },
  { days: 7, multiplier: 1.25 },
  { days: 14, multiplier: 1.5 },
  { days: 30, multiplier: 2 },
];

export const getStreakMultiplier = (days) => {
  for (let i = DAILY_STREAK_REWARDS.length - 1; i >= 0; i--) {
    if (days >= DAILY_STREAK_REWARDS[i].days) {
      return DAILY_STREAK_REWARDS[i].multiplier;
    }
  }
  return 1;
};
