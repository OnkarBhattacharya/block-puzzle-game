import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getExpProgress } from '../utils/progression';

export default function PlayerStats({ playerLevel, totalExp, dailyStreak, theme }) {
  const expData = getExpProgress(totalExp);

  return (
    <View style={[styles.container, { backgroundColor: theme.boardBackground }]}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.borderColor }]}>Level</Text>
          <Text style={[styles.statValue, { color: theme.filledColor }]}>{playerLevel}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: theme.borderColor }]}>Streak</Text>
          <Text style={[styles.statValue, { color: theme.clearingColor }]}>
            🔥 {dailyStreak}
          </Text>
        </View>
      </View>

      <View style={styles.expContainer}>
        <Text style={[styles.expLabel, { color: theme.borderColor }]}>
          EXP: {expData.progress}/{expData.needed}
        </Text>
        <View style={[styles.expBar, { backgroundColor: theme.borderColor }]}>
          <View
            style={[
              styles.expFill,
              {
                backgroundColor: theme.filledColor,
                width: `${expData.percentage}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expContainer: {
    marginTop: 8,
  },
  expLabel: {
    fontSize: 11,
    marginBottom: 4,
    fontWeight: '600',
  },
  expBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  expFill: {
    height: '100%',
    borderRadius: 4,
  },
});
