import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, useWindowDimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';

const BlockPreview = ({ blocks, onBlockSelect }) => {
  const windowDimensions = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const windowWidth = isWeb ? windowDimensions.width : Dimensions.get('window').width;
  const PREVIEW_CELL_SIZE = isWeb ? 14 : 12;
  const slotWidth = isWeb ? Math.max(60, Math.floor((windowWidth - 60) / 3) - 10) : windowWidth / 3 - 20;
  
  if (!blocks || blocks.length === 0) return null;

  return (
    <View style={styles.container}>
      {blocks.map((block, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.blockSlot, { width: slotWidth }]} 
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
                        width: PREVIEW_CELL_SIZE,
                        height: PREVIEW_CELL_SIZE,
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

BlockPreview.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.shape({
    shape: PropTypes.arrayOf(PropTypes.array).isRequired,
    color: PropTypes.string.isRequired,
  })),
  onBlockSelect: PropTypes.func.isRequired,
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
    borderWidth: 1,
    borderRadius: 1,
  },
});

export default React.memo(BlockPreview, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render), false otherwise
  return (
    prevProps.blocks === nextProps.blocks &&
    prevProps.onBlockSelect === nextProps.onBlockSelect
  );
});
