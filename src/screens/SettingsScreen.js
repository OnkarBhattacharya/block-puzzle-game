import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const SettingsScreen = ({ 
  theme, 
  soundEnabled, 
  setSoundEnabled, 
  hapticsEnabled, 
  setHapticsEnabled, 
  setTheme,
  onClose 
}) => {
  const { themes } = require('../utils/themes');
  
  const cycleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.findIndex(key => themes[key] === theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themes[themeKeys[nextIndex]]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.filledColor }]}>Settings</Text>
        
        <View style={[styles.section, { backgroundColor: theme.boardBackground }]}>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.filledColor }]}>Sound Effects</Text>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#ccc', true: theme.filledColor }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.boardBackground }]}>
          <View style={styles.row}>
            <Text style={[styles.label, { color: theme.filledColor }]}>Haptic Feedback</Text>
            <Switch
              value={hapticsEnabled}
              onValueChange={setHapticsEnabled}
              trackColor={{ false: '#ccc', true: theme.filledColor }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.boardBackground }]}>
          <TouchableOpacity style={styles.row} onPress={cycleTheme}>
            <Text style={[styles.label, { color: theme.filledColor }]}>Theme</Text>
            <Text style={[styles.value, { color: theme.clearingColor }]}>Tap to Change</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.closeButton, { backgroundColor: theme.filledColor }]} 
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

SettingsScreen.propTypes = {
  theme: PropTypes.object.isRequired,
  soundEnabled: PropTypes.bool.isRequired,
  setSoundEnabled: PropTypes.func.isRequired,
  hapticsEnabled: PropTypes.bool.isRequired,
  setHapticsEnabled: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsScreen;
