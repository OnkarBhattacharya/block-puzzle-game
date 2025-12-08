import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PowerUps = ({ theme, onUseBomb, onUseShuffle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.powerUpButton, { backgroundColor: theme.clearingColor }]} onPress={onUseBomb}>
        <Text style={[styles.powerUpText, { color: theme.backgroundColor }]}>Bomb</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.powerUpButton, { backgroundColor: theme.clearingColor }]} onPress={onUseShuffle}>
        <Text style={[styles.powerUpText, { color: theme.backgroundColor }]}>Shuffle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  powerUpButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  powerUpText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PowerUps;
