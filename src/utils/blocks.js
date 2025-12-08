export const BLOCKS = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: '#4a90e2',
  },
  J: {
    shape: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    color: '#f5a623',
  },
  L: {
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    color: '#d0021b',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#7ed321',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: '#bd10e0',
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: '#9013fe',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
   color: '#50e3c2',
  },
};

export const getRandomBlock = () => {
  const blockTypes = Object.keys(BLOCKS);
  const randomType = blockTypes[Math.floor(Math.random() * blockTypes.length)];
  return BLOCKS[randomType];
};
