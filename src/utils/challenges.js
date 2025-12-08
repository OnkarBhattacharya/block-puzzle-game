
export const challenges = [
  {
    id: 'score_2000',
    title: 'Score 2000 points',
    description: 'Reach a score of 2000 in a single game.',
    target: 2000,
    type: 'score',
  },
  {
    id: 'clear_5_lines',
    title: 'Clear 5 lines',
    description: 'Clear 5 lines in a single game.',
    target: 5,
    type: 'lines',
  },
  {
    id: 'play_3_games',
    title: 'Play 3 games',
    description: 'Play 3 games.',
    target: 3,
    type: 'games',
  },
];

export const getDailyChallenge = () => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  return challenges[dayOfYear % challenges.length];
};
