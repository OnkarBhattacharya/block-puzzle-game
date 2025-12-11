import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { GAME_MODES } from '../utils/progression';

export default function GameModeSelector({ visible, onClose, onSelectMode, theme, modeStats }) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.title, { color: theme.filledColor }]}>Select Game Mode</Text>
        <ScrollView style={styles.modesContainer}>
          {Object.values(GAME_MODES).map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[styles.modeCard, { borderColor: theme.filledColor }]}
              onPress={() => {
                onSelectMode(mode.id);
                onClose();
              }}
            >
              <Text style={styles.modeIcon}>{mode.icon}</Text>
              <View style={styles.modeInfo}>
                <Text style={[styles.modeName, { color: theme.filledColor }]}>
                  {mode.name}
                </Text>
                <Text style={[styles.modeDescription, { color: theme.borderColor }]}>
                  {mode.description}
                </Text>
                {mode.duration && (
                  <Text style={[styles.modeExtra, { color: theme.clearingColor }]}>
                    Duration: {mode.duration}s
                  </Text>
                )}
                {mode.moves && (
                  <Text style={[styles.modeExtra, { color: theme.clearingColor }]}>
                    Moves: {mode.moves}
                  </Text>
                )}
                {modeStats[mode.id] && modeStats[mode.id].bestScore && (
                  <Text style={[styles.bestScore, { color: theme.filledColor }]}>
                    Best: {modeStats[mode.id].bestScore}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: '#d9534f' }]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modesContainer: {
    flex: 1,
    marginBottom: 20,
  },
  modeCard: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  modeIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  modeInfo: {
    flex: 1,
  },
  modeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 13,
    marginBottom: 6,
  },
  modeExtra: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  bestScore: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
