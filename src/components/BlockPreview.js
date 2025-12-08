import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Block from './Block';
import { getRandomBlock } from '../utils/blocks';

const BlockPreview = ({ onBlockSelect }) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    generateNewBlocks();
  }, []);

  const generateNewBlocks = () => {
    const newBlocks = [getRandomBlock(), getRandomBlock(), getRandomBlock()];
    setBlocks(newBlocks);
  };

  return (
    <View style={styles.container}>
      {blocks.map((block, index) => (
        <View key={index} style={styles.blockSlot}>
          <Block block={block} onDrop={() => {}} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  blockSlot: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
  },
});

export default BlockPreview;
