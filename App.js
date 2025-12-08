import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GameBoard from './src/components/GameBoard';
import BlockPreview from './src/components/BlockPreview';
import AdManager from './src/services/AdManager';
import { saveScore, getHighScore } from './src/utils/storage';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    loadHighScore();
    AdManager.initialize();
  }, []);

  const loadHighScore = async () => {
    const saved = await getHighScore();
    setHighScore(saved);
  };

  const handleGameOver = async () => {
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      await saveScore(score);
    }
    
    const newGamesPlayed = gamesPlayed + 1;
    setGamesPlayed(newGamesPlayed);
    
    // Show interstitial ad every 3 games
    if (newGamesPlayed % 3 === 0) {
      AdManager.showInterstitial();
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
  };

  const watchAdForContinue = () => {
    AdManager.showRewarded(() => {
      setGameOver(false);
      // Give bonus points
      setScore(score + 50);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Block Puzzle</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>Score: {score}</Text>
          <Text style={styles.highScore}>Best: {highScore}</Text>
        </View>
      </View>

      <GameBoard 
        onScoreUpdate={setScore}
        onGameOver={handleGameOver}
        gameOver={gameOver}
      />

      <BlockPreview />

      {gameOver && (
        <View style={styles.gameOverModal}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.finalScore}>Score: {score}</Text>
          
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.rewardButton} onPress={watchAdForContinue}>
            <Text style={styles.buttonText}>Watch Ad to Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Banner Ad Space */}
      <View style={styles.bannerAd}>
        <Text style={styles.adPlaceholder}>Banner Ad Here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  score: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  highScore: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  gameOverModal: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  finalScore: {
    fontSize: 24,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  rewardButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bannerAd: {
    height: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adPlaceholder: {
    color: '#999',
    fontSize: 12,
  },
});
