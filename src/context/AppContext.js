import React, { createContext } from 'react';
import { useAppState } from '../hooks/useAppState';
import { useGame } from '../hooks/useGame';

// Keep a combined AppContext for backward compatibility, but expose
// smaller contexts to allow consumers to opt-in and avoid full-tree re-renders.
export const AppContext = createContext();
export const ThemeContext = createContext();
export const GameStateContext = createContext();
export const UIContext = createContext();

export const AppProvider = ({ children }) => {
  const appState = useAppState();
  const game = useGame(appState.soundEnabled, appState.hapticsEnabled);

  const themeValue = {
    theme: appState.theme,
    setTheme: appState.setTheme,
    toggleTheme: appState.toggleTheme,
  };

  const gameStateValue = {
    soundEnabled: appState.soundEnabled,
    setSoundEnabled: appState.setSoundEnabled,
    hapticsEnabled: appState.hapticsEnabled,
    setHapticsEnabled: appState.setHapticsEnabled,
    isAppReady: appState.isAppReady,
    prepareApp: appState.prepareApp,
    ...game,
  };

  const uiValue = {
    isSplashVisible: appState.isSplashVisible,
    setIsSplashVisible: appState.setIsSplashVisible,
    achievementsVisible: appState.achievementsVisible,
    setAchievementsVisible: appState.setAchievementsVisible,
    leaderboardVisible: appState.leaderboardVisible,
    setLeaderboardVisible: appState.setLeaderboardVisible,
    settingsVisible: appState.settingsVisible,
    setSettingsVisible: appState.setSettingsVisible,
    howToPlayVisible: appState.howToPlayVisible,
    setHowToPlayVisible: appState.setHowToPlayVisible,
    isPaused: appState.isPaused,
    setIsPaused: appState.setIsPaused,
  };

  // Combined value for compatibility
  const combinedValue = { ...appState, ...game };

  return (
    <ThemeContext.Provider value={themeValue}>
      <GameStateContext.Provider value={gameStateValue}>
        <UIContext.Provider value={uiValue}>
          <AppContext.Provider value={combinedValue}>
            {children}
          </AppContext.Provider>
        </UIContext.Provider>
      </GameStateContext.Provider>
    </ThemeContext.Provider>
  );
};
