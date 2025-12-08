import React, { createContext } from 'react';
import { useAppState } from '../hooks/useAppState';
import { useGame } from '../hooks/useGame';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const appState = useAppState();
  const game = useGame(appState.soundEnabled, appState.hapticsEnabled);

  return (
    <AppContext.Provider value={{ ...appState, ...game }}>
      {children}
    </AppContext.Provider>
  );
};
