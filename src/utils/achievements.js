
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
  // In a real app, you would load this from storage
  return achievements;
};

export const saveAchievements = async (updatedAchievements) => {
  // In a real app, you would save this to storage
  console.log('Achievements saved:', updatedAchievements);
};
