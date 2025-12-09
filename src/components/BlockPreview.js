import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const PREVIEW_CELL_SIZE = 12;

const BlockPreview = ({ blocks, onBlockSelect }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <View style={styles.container}>
      {blocks.map((block, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.blockSlot} 
          onPress={() => onBlockSelect(block)}
          activeOpacity={0.7}
        >
          <View style={styles.blockWrapper}>
            {block.shape.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => (
                  <View
                    key={`${rowIndex}-${colIndex}`}
                    style={[
                      styles.cell,
                      {
                        backgroundColor: cell === 1 ? block.color : 'transparent',
                        borderColor: cell === 1 ? '#fff' : 'transparent',
                      },
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 2,
    borderTopColor: '#ddd',
  },
  blockSlot: {
    width: width / 3 - 20,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  blockWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: PREVIEW_CELL_SIZE,
    height: PREVIEW_CELL_SIZE,
    borderWidth: 1,
    borderRadius: 1,
  },
});

export default BlockPreview;
