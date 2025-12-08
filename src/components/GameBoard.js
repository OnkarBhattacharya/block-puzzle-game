import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const GRID_SIZE = 8;
const CELL_SIZE = 40;

const GameBoard = ({ onScoreUpdate, onGameOver, gameOver }) => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    if (gameOver) {
      initializeGrid();
    }
  }, [gameOver]);

  const initializeGrid = () => {
    const newGrid = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(0)
    );
    setGrid(newGrid);
  };

  const handleCellPress = (row, col) => {
    if (gameOver) return;
    
    const newGrid = [...grid];
    newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0;
    setGrid(newGrid);
    
    checkAndClearLines(newGrid);
  };

  const checkAndClearLines = (currentGrid) => {
    let linesCleared = 0;
    const newGrid = [...currentGrid];

    // Check rows
    for (let row = 0; row < GRID_SIZE; row++) {
      if (newGrid[row].every(cell => cell === 1)) {
        newGrid[row] = Array(GRID_SIZE).fill(0);
        linesCleared++;
      }
    }

    // Check columns
    for (let col = 0; col < GRID_SIZE; col++) {
      if (newGrid.every(row => row[col] === 1)) {
        newGrid.forEach(row => row[col] = 0);
        linesCleared++;
      }
    }

    if (linesCleared > 0) {
      setGrid(newGrid);
      onScoreUpdate(prev => prev + (linesCleared * 10));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                style={[
                  styles.cell,
                  cell === 1 && styles.filledCell
                ]}
                onPress={() => handleCellPress(rowIndex, colIndex)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  board: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 1,
    backgroundColor: '#f9f9f9',
  },
  filledCell: {
    backgroundColor: '#4a90e2',
  },
});

export default GameBoard;
