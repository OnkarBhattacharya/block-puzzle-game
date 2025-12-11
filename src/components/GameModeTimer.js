import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GameModeTimer({ gameMode, onTimeUp, theme }) {
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    if (gameMode !== 'timeAttack') {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp && onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameMode, onTimeUp]);

  if (gameMode !== 'timeAttack') {
    return null;
  }

  const isLowTime = timeRemaining <= 10;
  const color = isLowTime ? theme.clearingColor : theme.filledColor;

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
      <Text style={[styles.label, { color: theme.borderColor }]}>Time</Text>
      <Text style={[styles.time, { color }]}>
        {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
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
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
});
