// Block shapes for the puzzle game
// Each block is represented as a 2D array where 1 = filled, 0 = empty

export const BLOCK_SHAPES = [
  // Single blocks
  { id: 1, shape: [[1]], color: '#e74c3c' },
  
  // 2-cell blocks
  { id: 2, shape: [[1, 1]], color: '#3498db' },
  { id: 3, shape: [[1], [1]], color: '#2ecc71' },
  
  // 3-cell blocks
  { id: 4, shape: [[1, 1, 1]], color: '#f39c12' },
  { id: 5, shape: [[1], [1], [1]], color: '#9b59b6' },
  { id: 6, shape: [[1, 1], [1, 0]], color: '#1abc9c' },
  { id: 7, shape: [[1, 1], [0, 1]], color: '#e67e22' },
  
  // 4-cell blocks
  { id: 8, shape: [[1, 1, 1, 1]], color: '#34495e' },
  { id: 9, shape: [[1], [1], [1], [1]], color: '#16a085' },
  { id: 10, shape: [[1, 1], [1, 1]], color: '#c0392b' },
  
  // L-shapes
  { id: 11, shape: [[1, 0], [1, 0], [1, 1]], color: '#d35400' },
  { id: 12, shape: [[0, 1], [0, 1], [1, 1]], color: '#8e44ad' },
  { id: 13, shape: [[1, 1, 1], [1, 0, 0]], color: '#27ae60' },
  { id: 14, shape: [[1, 1, 1], [0, 0, 1]], color: '#2980b9' },
  
  // T-shape
  { id: 15, shape: [[1, 1, 1], [0, 1, 0]], color: '#c0392b' },
  
  // Z-shapes
  { id: 16, shape: [[1, 1, 0], [0, 1, 1]], color: '#16a085' },
  { id: 17, shape: [[0, 1, 1], [1, 1, 0]], color: '#d35400' },
];

// Get random block shapes for the game
export const getRandomBlocks = (count = 3) => {
  const blocks = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * BLOCK_SHAPES.length);
    blocks.push({ ...BLOCK_SHAPES[randomIndex] });
  }
  return blocks;
};

// Check if block can be placed at position
export const canPlaceBlock = (grid, block, startRow, startCol) => {
  const { shape } = block;
  
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        const gridRow = startRow + row;
        const gridCol = startCol + col;
        
        // Check bounds
        if (gridRow >= grid.length || gridCol >= grid[0].length) {
          return false;
        }
        
        // Check if cell is already filled
        if (grid[gridRow][gridCol] === 1) {
          return false;
        }
      }
    }
  }
  
  return true;
};

// Place block on grid
export const placeBlock = (grid, block, startRow, startCol) => {
  const newGrid = grid.map(row => [...row]);
  const { shape } = block;
  
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        newGrid[startRow + row][startCol + col] = 1;
      }
    }
  }
  
  return newGrid;
};
