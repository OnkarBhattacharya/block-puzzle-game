
import React from 'react';

export const themes = {
  default: {
    backgroundColor: '#f9f9f9',
    filledColor: '#4a90e2',
    clearingColor: 'tomato',
    boardBackground: '#fff',
    borderColor: '#ddd',
    cellBorderColor: '#eee',
    blockBorderColor: '#fff',
  },
  dark: {
    backgroundColor: '#333',
    filledColor: '#9c27b0',
    clearingColor: '#ffeb3b',
    boardBackground: '#424242',
    borderColor: '#616161',
    cellBorderColor: '#555',
    blockBorderColor: '#fff',
  },
  forest: {
    backgroundColor: '#e8f5e9',
    filledColor: '#4caf50',
    clearingColor: '#ff9800',
    boardBackground: '#c8e6c9',
    borderColor: '#a5d6a7',
    cellBorderColor: '#b2dfdb',
    blockBorderColor: '#fff',
  },
  ocean: {
    backgroundColor: '#e0f7fa',
    filledColor: '#03a9f4',
    clearingColor: '#f44336',
    boardBackground: '#b3e5fc',
    borderColor: '#81d4fa',
    cellBorderColor: '#90caf9',
    blockBorderColor: '#fff',
  },
};

export const ThemeContext = React.createContext({ theme: themes.default, setTheme: () => {} });
