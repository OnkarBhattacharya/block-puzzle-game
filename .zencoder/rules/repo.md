---
description: Repository Information Overview
alwaysApply: true
---

# GridLock - Block Puzzle Game Information

## Summary
GridLock is a production-ready block puzzle game built with React Native and Expo SDK 54. It features drag-and-drop gameplay, Google AdMob integration, multiple themes, power-ups, daily challenges, and persistent score tracking. The game is optimized for iOS, Android, and web platforms with error handling and React performance optimizations.

## Structure
```
src/
├── components/          # Reusable game UI components
│   ├── GameBoard.js     # Main 8×8 grid with drag-drop logic
│   ├── BlockPreview.js  # Block selection area
│   ├── ErrorBoundary.js # Crash prevention wrapper
│   ├── PauseMenu.js     # Pause overlay
│   ├── PowerUps.js      # Bomb/shuffle functionality
│   ├── Rotation.js      # Block rotation controls
│   └── DailyChallenge.js # Challenge display
├── context/             # Global state management
│   └── AppContext.js    # Context API for game state
├── hooks/               # Custom React hooks
│   ├── useGame.js       # Game logic and mechanics
│   └── useAppState.js   # UI state and settings
├── screens/             # Full-screen views
│   ├── SplashScreen.js
│   ├── SettingsScreen.js
│   ├── AchievementsScreen.js
│   ├── LeaderboardScreen.js
│   └── HowToPlayScreen.js
├── services/            # External integrations
│   ├── AdManager.js     # Google AdMob integration
│   ├── SoundManager.js  # Audio playback
│   └── AnalyticsManager.js # Event tracking
├── assets/              # Images and sounds
└── utils/               # Utility functions and constants
    ├── blocks.js        # Tetris piece definitions
    ├── themes.js        # Color theme configuration
    ├── storage.js       # AsyncStorage helpers
    ├── achievements.js  # Achievement definitions
    └── challenges.js    # Daily challenge logic
```

## Language & Runtime
**Language**: JavaScript  
**Node.js**: Required (no specific version pinned)  
**Runtime**: Expo SDK 54.0.0  
**Build System**: Metro bundler (Expo-managed)  
**Package Manager**: npm  

## Dependencies
**Main Dependencies**:
- `react` 18.3.1 - UI library
- `react-native` 0.76.5 - Framework
- `expo` ~54.0.0 - Platform and CLI
- `expo-av` ~16.0.0 - Audio/video support
- `expo-haptics` ~15.0.0 - Vibration feedback
- `react-native-reanimated` ~3.16.0 - Smooth animations
- `react-native-gesture-handler` ~2.20.0 - Drag-and-drop
- `react-native-google-mobile-ads` ^14.3.2 - AdMob integration
- `@react-native-async-storage/async-storage` 2.2.0 - Data persistence
- `react-native-web` ~0.19.13 - Web support
- `expo-dev-client` ~6.0.20 - Development client
- `expo-status-bar` ~3.0.0 - Status bar management
- `prop-types` ^15.8.1 - Runtime type checking

**Development Dependencies**:
- `@babel/core` ^7.25.0 - JavaScript transpiler
- `babel-preset-expo` ~12.0.0 - Babel configuration for Expo

## Build & Installation

**Install Dependencies**:
```bash
npm install
```

**Development**:
```bash
npm start              # Start Expo development server
npm run ios           # Run on iOS simulator
npm run android       # Run on Android emulator
npm run web           # Run on web browser
```

**Production Build** (requires EAS CLI):
```bash
npm install -g eas-cli
eas login
eas build --platform android   # Build Android APK
eas build --platform ios       # Build iOS IPA
```

**Configuration Files**:
- `app.json` - Expo app configuration (app name, icon, splash screen, plugins, AdMob settings)
- `eas.json` - EAS build profiles (development, preview, production)
- `babel.config.js` - Babel transpiler config with Expo preset and Reanimated plugin
- `metro.config.js` - Metro bundler config (handles web platform exclusions)

## Entry Point
- **Main Entry**: `App.js` (376 lines) - Top-level component managing screens, game state, AdMob, and navigation
- **Package.json Main**: `node_modules/expo/AppEntry.js` (Expo managed entry point)

## Platform Configuration
**iOS** (`app.json`):
- Bundle ID: `com.yourcompany.gridlock`
- iPad support enabled
- Non-exempt encryption declaration

**Android** (`app.json`):
- Package: `com.yourcompany.gridlock`
- Adaptive icon support

**AdMob Integration**:
- Test Ad Unit IDs configured in `app.json`
- iOS App ID: `ca-app-pub-3940256099942544~1458002511`
- Android App ID: `ca-app-pub-3940256099942544~3347511713`
- Supports banner, interstitial, and rewarded video ads

## Features
- **Drag-and-drop** block placement with gesture recognition
- **8×8 grid** game board with collision detection
- **Score persistence** via AsyncStorage
- **4 color themes** (Default, Dark, Forest, Ocean)
- **Power-ups**: Bomb (3×3 clear) and Shuffle blocks
- **Daily challenges** and achievement tracking
- **Sound effects** and haptic feedback (toggleable)
- **Auto-save** game state and resume functionality
- **Error boundary** for crash prevention
- **Google AdMob** with multiple ad types
- **Responsive design** for all screen sizes

## Game Mechanics
- Blocks score 1 point per cell placed
- Line/column clears award 10 points × combo multiplier
- Combos increase with consecutive clears
- One power-up available per game
- Game over when no valid moves exist
- Rewarded ad option to continue (+50 points)

## Project Metadata
- **Name**: gridlock
- **Version**: 1.0.0
- **License**: MIT
- **Expo Project ID**: 74424210-c365-41b0-aa43-8357f4fa8cfc
