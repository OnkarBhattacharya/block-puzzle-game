import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Platform, TouchableOpacity, useWindowDimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import SoundManager from '../services/SoundManager';
import { TIMING, REWARDS, GAME_CONFIG } from '../utils/constants';

const GRID_SIZE = GAME_CONFIG.GRID_SIZE;
const PADDING = 30;
const BASE_CELL_SIZE = 45;

const GameBoard = ({
  grid,
  setGrid,
  onScoreUpdate,
  onGameOver,
  gameOver,
  activeBlock,
  onBlockPlaced,
  comboMultiplier,
  setComboMultiplier,
  soundEnabled,
  hapticsEnabled,
  theme,
}) => {
  const windowDimensions = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const boardRef = useRef(null);
  const draggableRef = useRef(null);
  
  const [boardLayout, setBoardLayout] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const windowWidth = isWeb ? windowDimensions.width : Dimensions.get('window').width;
  const CELL_SIZE = isWeb ? Math.max(30, Math.floor((windowWidth - 80) / GRID_SIZE)) : Math.floor((windowWidth - 60) / GRID_SIZE);
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (gameOver) {
      translateX.value = 0;
      translateY.value = 0;
      scale.value = 1;
    }
  }, [gameOver]);

  const canPlaceBlock = (gridX, gridY, block) => {
    if (!block || !Array.isArray(block.shape)) return false;
    if (typeof gridX !== 'number' || typeof gridY !== 'number') return false;
    if (!Array.isArray(grid) || grid.length === 0) return false;
    for (let y = 0; y < block.shape.length; y++) {
      for (let x = 0; x < block.shape[y].length; x++) {
        if (block.shape[y][x] === 1) {
          const newX = gridX + x;
          const newY = gridY + y;
          if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE || (grid[newY] && grid[newY][newX] === 1)) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const checkAndClearLines = (currentGrid) => {
    let linesCleared = 0;
    const newGrid = currentGrid.map(row => [...row]);
    const rowsToClear = [];
    const colsToClear = [];

    for (let row = 0; row < GRID_SIZE; row++) {
      if (newGrid[row].every(cell => cell === 1)) {
        rowsToClear.push(row);
        linesCleared++;
      }
    }

    for (let col = 0; col < GRID_SIZE; col++) {
      if (newGrid.every(row => row[col] === 1)) {
        colsToClear.push(col);
        linesCleared++;
      }
    }

    if (linesCleared > 0) {
      rowsToClear.forEach(row => newGrid[row].fill(0));
      colsToClear.forEach(col => {
        newGrid.forEach(row => (row[col] = 0));
      });
    }
    
    return linesCleared;
  };

  const checkGameOver = (currentGrid) => {
    if (!activeBlock) return false;
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (canPlaceBlock(x, y, activeBlock)) {
          return false;
        }
      }
    }
    return true;
  };

  const placeBlock = (gridX, gridY, block) => {
    const newGrid = grid.map(row => [...row]);
    let blocksPlaced = 0;
    
    for (let y = 0; y < block.shape.length; y++) {
      for (let x = 0; x < block.shape[y].length; x++) {
        if (block.shape[y][x] === 1) {
          if (gridY + y < GRID_SIZE && gridX + x < GRID_SIZE) {
            newGrid[gridY + y][gridX + x] = 1;
            blocksPlaced++;
          }
        }
      }
    }

    const linesCleared = checkAndClearLines(newGrid);
    if (linesCleared === 0) {
      setComboMultiplier(1);
    } else {
      if (hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      if (soundEnabled) SoundManager.playSound('clear');
      setComboMultiplier(prev => prev + 1);
    }

    setGrid(newGrid);
    onScoreUpdate(prev => prev + (blocksPlaced * REWARDS.BLOCK_PLACEMENT) + (linesCleared * REWARDS.LINE_CLEAR_BASE * comboMultiplier));
    
    setTimeout(() => {
      if (checkGameOver(newGrid)) {
        onGameOver();
      } else {
        onBlockPlaced(linesCleared);
      }
    }, TIMING.GAME_OVER_DELAY);
  };

  const handleDrop = (gridX, gridY, block) => {
    if (canPlaceBlock(gridX, gridY, block)) {
      placeBlock(gridX, gridY, block);
      if (hapticsEnabled && !isWeb) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      if (soundEnabled) SoundManager.playSound('place');
    } else {
      if (hapticsEnabled && !isWeb) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  };

  const handleCellPress = (rowIndex, colIndex) => {
    if (isWeb && activeBlock && !gameOver) {
      handleDrop(colIndex, rowIndex, activeBlock);
    }
  };

  const handleWebMouseDown = (e) => {
    if (!isWeb || !activeBlock || gameOver) return;
    setIsDragging(true);
    setDragPos({ x: e.nativeEvent.offsetX || e.clientX, y: e.nativeEvent.offsetY || e.clientY });
  };

  const handleWebMouseMove = (e) => {
    if (!isWeb || !isDragging) return;
    const rect = boardRef.current?.getBoundingClientRect?.();
    if (rect) {
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      setDragPos({ x: newX, y: newY });
    }
  };

  const handleWebMouseUp = (e) => {
    if (!isWeb || !isDragging || !boardRef.current) {
      setIsDragging(false);
      return;
    }
    setIsDragging(false);
    const rect = boardRef.current.getBoundingClientRect?.();
    if (rect && activeBlock) {
      const gridX = Math.floor((e.clientX - rect.left) / CELL_SIZE);
      const gridY = Math.floor((e.clientY - rect.top) / CELL_SIZE);
      handleDrop(gridX, gridY, activeBlock);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      scale.value = withSpring(1.2);
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const boardOffset = 30;
      const headerHeight = 250;
      const gridX = Math.floor((event.absoluteX - boardOffset) / CELL_SIZE);
      const gridY = Math.floor((event.absoluteY - headerHeight) / CELL_SIZE);
      runOnJS(handleDrop)(gridX, gridY, activeBlock);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ],
  }));

  return (
    <View style={styles.container}>
      {isWeb ? (
        // Web version: Use mouse events
        <>
          {activeBlock && !gameOver && isDragging && (
            <View
              ref={draggableRef}
              style={[
                styles.webDraggableBlock,
                {
                  left: dragPos.x - CELL_SIZE,
                  top: dragPos.y - CELL_SIZE,
                },
              ]}
              onMouseMove={handleWebMouseMove}
              onMouseUp={handleWebMouseUp}
              onMouseLeave={handleWebMouseUp}
            >
              {activeBlock.shape.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((cell, colIndex) => (
                    <View
                      key={`${rowIndex}-${colIndex}`}
                      style={[
                        styles.cell,
                        {
                          width: CELL_SIZE,
                          height: CELL_SIZE,
                          backgroundColor: cell === 1 ? activeBlock.color : 'transparent',
                          borderColor: cell === 1 ? '#fff' : 'transparent',
                        },
                      ]}
                    />
                  ))}
                </View>
              ))}
            </View>
          )}
          <View
            ref={boardRef}
            style={[
              styles.board,
              {
                backgroundColor: theme.boardBackground,
                borderColor: theme.borderColor,
                borderWidth: 2,
              },
            ]}
            onMouseDown={handleWebMouseDown}
            onMouseMove={handleWebMouseMove}
            onMouseUp={handleWebMouseUp}
            onMouseLeave={handleWebMouseUp}
          >
            {grid.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => (
                  <TouchableOpacity
                    key={`${rowIndex}-${colIndex}`}
                    style={[
                      styles.cell,
                      {
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        backgroundColor: cell === 1 ? theme.filledColor : theme.backgroundColor,
                        borderColor: theme.cellBorderColor,
                      },
                    ]}
                    onPress={() => handleCellPress(rowIndex, colIndex)}
                    disabled={false}
                  />
                ))}
              </View>
            ))}
          </View>
        </>
      ) : (
        // Native version: Use gesture handler
        <>
          {activeBlock && !gameOver && (
            <PanGestureHandler onGestureEvent={gestureHandler}>
              <Animated.View style={[styles.draggableBlock, animatedStyle]}>
                {activeBlock.shape.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {row.map((cell, colIndex) => (
                      <View
                        key={`${rowIndex}-${colIndex}`}
                        style={[
                          styles.cell,
                          {
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            backgroundColor: cell === 1 ? activeBlock.color : 'transparent',
                            borderColor: cell === 1 ? '#fff' : 'transparent',
                          },
                        ]}
                      />
                    ))}
                  </View>
                ))}
              </Animated.View>
            </PanGestureHandler>
          )}
          <View
            style={[
              styles.board,
              {
                backgroundColor: theme.boardBackground,
                borderColor: theme.borderColor,
                borderWidth: 2,
              },
            ]}
          >
            {grid.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => (
                  <TouchableOpacity
                    key={`${rowIndex}-${colIndex}`}
                    style={[
                      styles.cell,
                      {
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        backgroundColor: cell === 1 ? theme.filledColor : theme.backgroundColor,
                        borderColor: theme.cellBorderColor,
                      },
                    ]}
                    onPress={() => handleCellPress(rowIndex, colIndex)}
                    disabled={true}
                  />
                ))}
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  board: {
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderRadius: 2,
  },
  draggableBlock: {
    position: 'absolute',
    zIndex: 1000,
    top: 100,
    left: '50%',
    marginLeft: -50,
  },
  webDraggableBlock: {
    position: 'absolute',
    zIndex: 1000,
    pointerEvents: 'none',
    opacity: 0.8,
  },
});

export default GameBoard;