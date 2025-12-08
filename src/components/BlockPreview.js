import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const BlockPreview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Next Blocks</Text>
      <View style={styles.previewContainer}>
        {/* Placeholder for block previews */}
        <View style={styles.blockSlot}>
          <View style={styles.miniBlock} />
        </View>
        <View style={styles.blockSlot}>
          <View style={styles.miniBlock} />
        </View>
        <View style={styles.blockSlot}>
          <View style={styles.miniBlock} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  previewContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  blockSlot: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  miniBlock: {
    width: 30,
    height: 30,
    backgroundColor: '#4a90e2',
    borderRadius: 4,
  },
});

export default BlockPreview;
