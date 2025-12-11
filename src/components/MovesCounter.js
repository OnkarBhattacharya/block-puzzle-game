import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MovesCounter({ gameMode, movesRemaining, theme }) {
  if (gameMode !== 'limitedMoves') {
    return null;
  }

  const isLow = movesRemaining <= 3;
  const color = isLow ? theme.clearingColor : theme.filledColor;

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
      <Text style={[styles.label, { color: theme.borderColor }]}>Moves Left</Text>
      <Text style={[styles.moves, { color }]}>
        {movesRemaining}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
  moves: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
});
