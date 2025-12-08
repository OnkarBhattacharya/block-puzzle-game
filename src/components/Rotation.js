import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Rotation = ({ onRotate, theme }) => (
  <TouchableOpacity 
    style={[styles.button, { backgroundColor: theme.clearingColor }]} 
    onPress={onRotate}
  >
    <Text style={[styles.text, { color: theme.backgroundColor }]}>Rotate</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Rotation;
