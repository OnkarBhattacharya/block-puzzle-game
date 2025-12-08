import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Vibration, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import SoundManager from '../services/SoundManager';
import { ThemeContext } from '../utils/themes';

const GRID_SIZE = 8;
const CELL_SIZE = 40;

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
  isBombActive,
  onBombPlacement,
}) => {
  const { theme } = useContext(ThemeContext);
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
    if (!block) return false;
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
    }

    setGrid(newGrid);
    onScoreUpdate(prev => prev + blocksPlaced + (linesCleared * 10 * comboMultiplier));
    
    if (checkGameOver(newGrid)) {
      onGameOver();
    } else {
      onBlockPlaced(linesCleared);
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
      const containerPadding = 20;
      const boardPadding = 5;
      const boardTop = containerPadding + 120; 
      const gridX = Math.floor((event.absoluteX - boardPadding) / CELL_SIZE);
      const gridY = Math.floor((event.absoluteY - boardTop) / CELL_SIZE);
      runOnJS(handleDrop)(gridX, gridY, activeBlock);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });

  const handleDrop = (gridX, gridY, block) => {
    if (canPlaceBlock(gridX, gridY, block)) {
      placeBlock(gridX, gridY, block);
    } else {
      if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  };

  const handleBoardTap = (event) => {
    if (isBombActive) {
        const { locationX, locationY } = event.nativeEvent;
        const gridX = Math.floor(locationX / CELL_SIZE);
        const gridY = Math.floor(locationY / CELL_SIZE);
        onBombPlacement(gridX, gridY);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
    position: 'absolute',
    zIndex: 100,
    top: 80,
    left: 40,
  }));

  const checkAndClearLines = (currentGrid) => {
    let linesCleared = 0;
    let newGrid = currentGrid.map(row => [...row]);
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
        setComboMultiplier(prev => prev + linesCleared);
        rowsToClear.forEach(row => {
          newGrid[row].fill(2); // Mark for clearing
        });
        colsToClear.forEach(col => {
          newGrid.forEach(row => (newGrid[row][col] = 2));
        });
        setGrid(newGrid);

        setTimeout(() => {
            let gridAfterClear = newGrid.map(r => r.map(c => (c === 2 ? 0 : c)));
            setGrid(gridAfterClear);
        }, 300);
    }
    return linesCleared;
  };

  const checkGameOver = (currentGrid) => {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (currentGrid[y][x] === 0) {
          if (canPlaceBlock(x, y, activeBlock)) {
            return false;
          }
        }
      }
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={animatedStyle}>
          {activeBlock && !gameOver && (
            <View>
              {activeBlock.shape.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((cell, colIndex) => (
                    <View
                      key={`${rowIndex}-${colIndex}`}
                      style={[
                        styles.cell,
                        {
                          backgroundColor: cell === 1 ? activeBlock.color : 'transparent',
                          borderColor: cell === 1 ? theme.blockBorderColor : 'transparent',
                        },
                      ]}
                    />
                  ))}
                </View>
              ))}
            </View>
          )}
        </Animated.View>
      </PanGestureHandler>
      <TouchableWithoutFeedback onPress={handleBoardTap}>
        <View style={[styles.board, { backgroundColor: theme.boardBackground, borderColor: isBombActive ? 'red' : theme.borderColor }]}>
            {grid.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => {
                  const animatedCell = useSharedValue(1);
                  if (cell === 2) {
                    animatedCell.value = withTiming(0, { duration: 300 });
                  } else {
                    animatedCell.value = withTiming(1, { duration: 300 });
                  }
                  const animatedCellStyle = useAnimatedStyle(() => ({
                    transform: [{ scale: animatedCell.value }],
                    backgroundColor: cell === 1 ? theme.filledColor : theme.backgroundColor,
                  }));

                  return (
                    <Animated.View
                        key={`${rowIndex}-${colIndex}`}
                        style={[
                        styles.cell,
                        { borderColor: theme.cellBorderColor },
                        animatedCellStyle,
                        ]}
                    />
                  );
                })}
            </View>
            ))}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  board: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
  },
});

export default GameBoard;
