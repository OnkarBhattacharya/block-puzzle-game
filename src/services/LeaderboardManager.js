import { Logger } from '../utils/logger';
import { GAME_CONFIG } from '../utils/constants';

const validatePlayerName = (name) => {
  if (!name || typeof name !== 'string') {
    throw new Error('Invalid player name');
  }
  if (name.length > GAME_CONFIG.MAX_PLAYER_NAME_LENGTH) {
    throw new Error(`Player name too long (max ${GAME_CONFIG.MAX_PLAYER_NAME_LENGTH} characters)`);
  }
  return name.trim();
};

const validateScore = (score) => {
  if (!Number.isInteger(score) || score < 0) {
    throw new Error('Invalid score');
  }
  return score;
};

const getLeaderboard = async () => {
  const apiUrl = global.LEADERBOARD_API_URL || process.env.LEADERBOARD_API_URL || '';
  if (!apiUrl) {
    // No API configured, return stubbed leaderboard
    return [
      { id: '1', name: 'Player 1', score: 10000 },
      { id: '2', name: 'Player 2', score: 8000 },
      { id: '3', name: 'Player 3', score: 6000 },
    ];
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const resp = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (!resp.ok) throw new Error(`API error: ${resp.status}`);
    const data = await resp.json();
    return data;
  } catch (error) {
    Logger.error('LeaderboardManager', 'Failed to fetch leaderboard, returning cached/stub', error);
    // Fallback to cached or stub data
    const fallback = [
      { id: '1', name: 'Player 1', score: 10000 },
      { id: '2', name: 'Player 2', score: 8000 },
      { id: '3', name: 'Player 3', score: 6000 },
    ];
    return fallback;
  }
};

const submitScore = async (name, score) => {
  try {
    const validName = validatePlayerName(name);
    const validScore = validateScore(score);
    
    // Stub implementation - replace with real API call
    Logger.info('LeaderboardManager', `Submitting score: ${validName} - ${validScore}`);
    return true;
  } catch (error) {
    Logger.error('LeaderboardManager', 'Failed to submit score', error);
    throw error;
  }
};

export default { getLeaderboard, submitScore };
