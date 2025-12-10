import React, { useContext, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Modal, BackHandler, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GameBoard from './src/components/GameBoard';
import BlockPreview from './src/components/BlockPreview';
import AdManager from './src/services/AdManager';
import ErrorBoundary from './src/components/ErrorBoundary';
import { REWARDS } from './src/utils/constants';
import AchievementsScreen from './src/screens/AchievementsScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SplashScreen from './src/screens/SplashScreen';
import HowToPlayScreen from './src/screens/HowToPlayScreen';
import PauseMenu from './src/components/PauseMenu';

import DailyChallenge from './src/components/DailyChallenge';
import { AppProvider, AppContext } from './src/context/AppContext';

function App() {
  const {
    theme,
    isAppReady,
    isSplashVisible,
    isPaused,
    setIsPaused,
    achievementsVisible,
    setAchievementsVisible,
    leaderboardVisible,
    setLeaderboardVisible,
    settingsVisible,
    setSettingsVisible,
    howToPlayVisible,
    setHowToPlayVisible,
    grid,
    setGrid,
    score,
    highScore,
    gameOver,
    activeBlock,
    setActiveBlock,
    previewBlocks,
    comboMultiplier,
    setComboMultiplier,
    dailyChallenge,
    dailyChallengeProgress,
    soundEnabled,
    hapticsEnabled,

    handleGameOver,
    handleBlockPlaced,
    handleUndo,
    resetGame,

    loadGame,
    prepareApp,
    achievements,
    setScore,
    setGameOver,
    setSoundEnabled,
    setHapticsEnabled,
    setTheme
  } = useContext(AppContext);

  useEffect(() => {
    AdManager.initialize();
    prepareApp();
    loadGame();
  }, []);

  const quitGame = useCallback(() => {
    Alert.alert(
      "Quit Game",
      "Are you sure you want to quit? Your current progress will be saved.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
  }, []);

  const watchAdForContinue = useCallback(() => {
    AdManager.showRewarded(() => {
      setGameOver(false);
      setScore(score + REWARDS.CONTINUE_BONUS);
    });
  }, [score, setGameOver, setScore]);

  if (isSplashVisible) {
    return <SplashScreen theme={theme} />;
  }

  if (!isAppReady) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.backgroundColor }]}>
        <ActivityIndicator size="large" color={theme.filledColor} />
        <Text>Loading Assets...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar style="light" />
      <View style={[styles.header, { backgroundColor: theme.filledColor }]}>
        <Text style={[styles.title, { color: theme.backgroundColor }]}>GridLock</Text>
        <View style={styles.scoreContainer}>
          <Text style={[styles.score, { color: theme.backgroundColor }]}>Score: {score}</Text>
          <Text style={[styles.highScore, { color: theme.backgroundColor }]}>Best: {highScore}</Text>
        </View>
        <View style={styles.controlsContainer}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.clearingColor }]} onPress={handleUndo}>
                <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>Undo</Text>
            </TouchableOpacity>
             <TouchableOpacity style={[styles.iconButton, { backgroundColor: '#7f8c8d'}]} onPress={() => setIsPaused(true)}>
                <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            {comboMultiplier > 1 && (
                <Text style={[styles.comboText, { color: theme.clearingColor }]}>x{comboMultiplier}</Text>
            )}
        </View>
        {dailyChallenge && <DailyChallenge challenge={dailyChallenge} progress={dailyChallengeProgress} />}
      </View>
      <GameBoard
        grid={grid}
        setGrid={setGrid}
        onScoreUpdate={setScore}
        onGameOver={handleGameOver}
        gameOver={gameOver || isPaused}
        activeBlock={activeBlock}
        onBlockPlaced={handleBlockPlaced}
        comboMultiplier={comboMultiplier}
        setComboMultiplier={setComboMultiplier}
        soundEnabled={soundEnabled}
        hapticsEnabled={hapticsEnabled}
        theme={theme}
      />
      {!gameOver && (
        <View style={styles.bottomControls}>
          <BlockPreview blocks={previewBlocks} onBlockSelect={setActiveBlock} />
        </View>
      )}
      {gameOver && !isPaused && (
        <View style={styles.gameOverModal}>
            <View style={[styles.gameOverContent, { backgroundColor: theme.boardBackground }]}>
                <Text style={[styles.gameOverText, { color: theme.clearingColor }]}>Game Over!</Text>
                <Text style={[styles.finalScore, { color: theme.filledColor }]}>Score: {score}</Text>
                <TouchableOpacity style={[styles.button, { backgroundColor: theme.filledColor }]} onPress={resetGame}>
                    <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>Play Again</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.rewardButton, { backgroundColor: '#5cb85c' }]} onPress={watchAdForContinue}>
                    <Text style={styles.buttonText}>Watch Ad to Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
      )}
       {isPaused && (
          <PauseMenu 
            theme={theme} 
            onResume={() => setIsPaused(false)} 
            onRestart={resetGame}
            onSettings={() => {
                setIsPaused(false);
                setSettingsVisible(true);
            }}
            onHowToPlay={() => {
                setIsPaused(false);
                setHowToPlayVisible(true);
            }}
            onQuit={quitGame}
        />
      )}
      <View style={[styles.bannerAd, { backgroundColor: theme.boardBackground, borderColor: theme.borderColor }]}>
        {AdManager.getBannerComponent()}
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={achievementsVisible}
        onRequestClose={() => {
          setAchievementsVisible(!achievementsVisible);
        }}>
        <AchievementsScreen achievements={achievements || {}} />
         <TouchableOpacity style={styles.closeButton} onPress={() => setAchievementsVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={leaderboardVisible}
        onRequestClose={() => {
          setLeaderboardVisible(!leaderboardVisible);
        }}>
        <LeaderboardScreen />
         <TouchableOpacity style={styles.closeButton} onPress={() => setLeaderboardVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </Modal>
       <Modal
        animationType="slide"
        transparent={false}
        visible={settingsVisible}
        onRequestClose={() => {
          setSettingsVisible(!settingsVisible);
        }}>
        <SettingsScreen
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            hapticsEnabled={hapticsEnabled}
            setHapticsEnabled={setHapticsEnabled}
            theme={theme}
            setTheme={setTheme}
            onClose={() => setSettingsVisible(false)}
        />
      </Modal>
        <Modal
        animationType="slide"
        transparent={false}
        visible={howToPlayVisible}
        onRequestClose={() => {
          setHowToPlayVisible(!howToPlayVisible);
        }}>
        <HowToPlayScreen theme={theme} onClose={() => setHowToPlayVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 15,
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    highScore: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
        marginBottom: 15,
    },
    iconButton: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    comboText: {
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    gameOverModal: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    gameOverContent: {
        padding: 30,
        borderRadius: 15,
        alignItems: 'center',
        width: '85%',
    },
    gameOverText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    finalScore: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
    },
    rewardButton: {
        backgroundColor: '#5cb85c',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottomControls: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
    },
    bannerAd: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopWidth: 1,
    },
    adPlaceholder: {
        fontSize: 12,
    },
    closeButton: {
        backgroundColor: '#d9534f',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '100%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
    }
});

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  );
}
