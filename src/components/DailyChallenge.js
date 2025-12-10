import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const DailyChallenge = ({ challenge, progress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Challenge</Text>
      <Text style={styles.challengeTitle}>{challenge.title}</Text>
      <Text style={styles.progress}>
        Progress: {progress} / {challenge.target}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  challengeTitle: {
    fontSize: 16,
  },
  progress: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

DailyChallenge.propTypes = {
  challenge: PropTypes.shape({
    title: PropTypes.string.isRequired,
    target: PropTypes.number.isRequired,
  }).isRequired,
  progress: PropTypes.number.isRequired,
};

export default DailyChallenge;
