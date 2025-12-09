# GridLock - Production-Ready Block Puzzle Game

Modern React Native block puzzle game built with Expo SDK 54. Features smooth drag-and-drop gameplay, Google AdMob integration, and polished graphics.

## ✨ Features

✅ **Smooth Gameplay** - Drag-and-drop block placement with gesture handling  
✅ **Responsive Design** - Adapts to all screen sizes (iOS & Android)  
✅ **Score System** - High score persistence with AsyncStorage  
✅ **AdMob Integration** - Banner, interstitial, and rewarded ads  
✅ **Sound & Haptics** - Audio feedback and vibration effects  
✅ **Multiple Themes** - 4 color themes (Default, Dark, Forest, Ocean)  
✅ **Power-ups** - Bomb (3×3 clear) and Shuffle blocks  
✅ **Daily Challenges** - Achievement system with progress tracking  
✅ **Game State** - Auto-save and resume functionality

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 📱 Tech Stack

- **Expo SDK**: 54.0.0
- **React**: 18.3.1
- **React Native**: 0.76.5
- **Reanimated**: 3.16.0 (smooth animations)
- **Gesture Handler**: 2.20.0 (drag-and-drop)
- **Google Mobile Ads**: 14.3.2
- **AsyncStorage**: 2.1.0

## 📂 Project Structure

```
src/
├── components/
│   ├── GameBoard.js        # Main game grid with drag-drop
│   ├── BlockPreview.js     # Block selection area
│   ├── PauseMenu.js        # Pause overlay
│   ├── PowerUps.js         # Bomb/shuffle buttons
│   ├── Rotation.js         # Block rotation
│   └── DailyChallenge.js   # Challenge display
├── context/
│   └── AppContext.js       # Global state (Context API)
├── hooks/
│   ├── useGame.js          # Game logic
│   └── useAppState.js      # UI state & settings
├── screens/
│   ├── SplashScreen.js
│   ├── SettingsScreen.js
│   ├── AchievementsScreen.js
│   ├── LeaderboardScreen.js
│   └── HowToPlayScreen.js
├── services/
│   ├── AdManager.js        # AdMob integration
│   ├── SoundManager.js     # Audio playback
│   └── AnalyticsManager.js # Event tracking (stub)
└── utils/
    ├── blocks.js           # Block shapes (7 Tetris pieces)
    ├── themes.js           # Color themes
    ├── storage.js          # AsyncStorage helpers
    ├── achievements.js     # Achievement definitions
    └── challenges.js       # Daily challenge logic
```

## 🎮 Game Mechanics

### Block Placement
- Drag blocks from preview area onto 8×8 grid
- Blocks cannot overlap or go out of bounds
- 3 random blocks available at a time

### Scoring
- **Place block**: +1 point per cell
- **Clear line**: +10 points × combo multiplier
- **Combo**: Multiplier increases with consecutive clears

### Power-ups (1 per game)
- **Bomb**: Clears 3×3 area
- **Shuffle**: Regenerates available blocks

### Game Over
- No valid moves for any available block
- Option to watch rewarded ad to continue (+50 points)

## 💰 AdMob Setup

### 1. Get Ad Unit IDs

Create account at https://admob.google.com and generate:
- Banner Ad ID
- Interstitial Ad ID  
- Rewarded Video Ad ID

### 2. Update `src/services/AdManager.js`

```javascript
const adUnitIds = Platform.select({
  ios: {
    banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    rewarded: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  },
  android: {
    banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
    rewarded: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  },
});
```

### 3. Update `app.json`

```json
"plugins": [
  [
    "react-native-google-mobile-ads",
    {
      "androidAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX",
      "iosAppId": "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX"
    }
  ]
]
```

### Ad Strategy
- **Banner**: Always visible at bottom
- **Interstitial**: Every 3 games
- **Rewarded**: Optional continue after game over

## 🎨 Customization

### Change Themes
Edit `src/utils/themes.js`:
```javascript
export const themes = {
  default: {
    backgroundColor: '#f9f9f9',
    filledColor: '#4a90e2',
    clearingColor: '#ff6b6b',
    // ...
  },
};
```

### Adjust Difficulty
Edit `src/components/GameBoard.js`:
```javascript
const GRID_SIZE = 8; // Change grid size
```

### Change Ad Frequency
Edit `src/hooks/useGame.js`:
```javascript
if (newGamesPlayed % 3 === 0) { // Change frequency
  AdManager.showInterstitial();
}
```

## 🏗️ Building for Production

### Setup EAS Build
```bash
npm install -g eas-cli
eas login
eas build:configure
```

### Build Android
```bash
eas build --platform android
```

### Build iOS
```bash
eas build --platform ios
```

## 🧪 Testing Checklist

- [ ] Block placement on all grid positions
- [ ] Line clearing (horizontal & vertical)
- [ ] Combo multiplier calculation
- [ ] Game over detection
- [ ] High score persistence
- [ ] Sound effects toggle
- [ ] Haptic feedback toggle
- [ ] Theme switching
- [ ] Power-ups functionality
- [ ] Ad loading (banner, interstitial, rewarded)
- [ ] Responsive design on different screen sizes
- [ ] Performance (60 FPS target)

## 📝 Known Limitations

- **Firebase Analytics**: Removed (incompatible with Expo managed workflow)
- **Remote Config**: Hardcoded values instead
- **Native Modules**: Stay in managed workflow to avoid TurboModule errors

## 🐛 Troubleshooting

### TurboModule Error
```bash
rm -rf ios android
npx expo start --clear
```

### Ads Not Showing
- Using test IDs during development (normal behavior)
- Check internet connection
- Verify AdMob account status

### Sound Not Playing
- Check device volume
- Toggle sound in settings
- Verify audio files exist in `src/assets/sounds/`

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev)
- [AdMob Setup Guide](https://docs.page/invertase/react-native-google-mobile-ads)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

## 📄 License

MIT - Free to use and modify for commercial projects
