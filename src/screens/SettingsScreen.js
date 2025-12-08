import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = ({ theme, soundEnabled, setSoundEnabled, hapticsEnabled, setHapticsEnabled, setTheme }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.filledColor }]}>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default SettingsScreen;
