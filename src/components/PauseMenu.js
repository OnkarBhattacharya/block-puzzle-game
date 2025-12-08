import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PauseMenu = ({ theme, onResume, onRestart, onSettings, onHowToPlay }) => {
  return (
    <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
      <View style={[styles.menu, { backgroundColor: theme.boardBackground }]}>
        <Text style={[styles.title, { color: theme.filledColor }]}>Paused</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.filledColor }]} onPress={onResume}>
          <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.clearingColor }]} onPress={onRestart}>
          <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#7f8c8d' }]} onPress={onSettings}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#9b59b6' }]} onPress={onHowToPlay}>
          <Text style={styles.buttonText}>How to Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  menu: {
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    width: '85%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PauseMenu;
