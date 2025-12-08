
const getLeaderboard = async () => {
  // In a real app, you would fetch this from a server
  const fakeLeaderboard = [
    { id: '1', name: 'Player 1', score: 10000 },
    { id: '2', name: 'Player 2', score: 8000 },
    { id: '3', name: 'Player 3', score: 6000 },
  ];
  return fakeLeaderboard;
};

const submitScore = async (name, score) => {
  // In a real app, you would send this to a server
  console.log(`Submitting score: ${name} - ${score}`);
  return true;
};

export default { getLeaderboard, submitScore };
