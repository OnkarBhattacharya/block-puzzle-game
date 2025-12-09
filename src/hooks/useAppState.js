
import { useState, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { themes } from '../utils/themes';
import SoundManager from '../services/SoundManager';
import AdManager from '../services/AdManager';
import { saveGameState, loadGameState } from '../utils/storage';
import { achievements as achievementsList, getAchievements, saveAchievements } from '../utils/achievements';
import { getDailyChallenge } from '../utils/challenges';

export const useAppState = () => {
  const [theme, setTheme] = useState(themes.default);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [achievementsVisible, setAchievementsVisible] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [howToPlayVisible, setHowToPlayVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const appState = useRef(AppState.currentState);

  const toggleTheme = () => {
    setTheme(currentTheme => {
      const newTheme = currentTheme === themes.default ? themes.dark : currentTheme === themes.dark ? themes.forest : currentTheme === themes.forest ? themes.ocean : themes.default;
      return newTheme;
    });
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        AdManager.showAppOpenAd();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const prepareApp = async () => {
    try {
      await SoundManager.loadSounds();
      AdManager.initialize();
      const savedState = await loadGameState();
      if (savedState) {
          setSoundEnabled(savedState.soundEnabled !== null ? savedState.soundEnabled : true);
          setHapticsEnabled(savedState.hapticsEnabled !== null ? savedState.hapticsEnabled : true);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setTimeout(() => {
        setIsAppReady(true);
        setIsSplashVisible(false);
      }, 2000);
    }
  };


  return {
    theme,
    setTheme,
    toggleTheme,
    soundEnabled,
    setSoundEnabled,
    hapticsEnabled,
    setHapticsEnabled,
    isAppReady,
    isSplashVisible,
    achievementsVisible,
    setAchievementsVisible,
    leaderboardVisible,
    setLeaderboardVisible,
    settingsVisible,
    setSettingsVisible,
    howToPlayVisible,
    setHowToPlayVisible,
    isPaused,
    setIsPaused,
    prepareApp,
  };
};
