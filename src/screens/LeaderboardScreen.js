import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import LeaderboardManager from '../services/LeaderboardManager';

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const data = await LeaderboardManager.getLeaderboard();
    setLeaderboard(data);
  };

  const handleSubmitScore = async (score) => {
    await LeaderboardManager.submitScore(playerName, score);
    fetchLeaderboard();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        renderItem={({ item }) => (
          <View style={styles.entry}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.submitContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={playerName}
          onChangeText={setPlayerName}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  entry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitContainer: {
      flexDirection: 'row',
      marginTop: 20,
  },
  input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
  }
});

export default LeaderboardScreen;
