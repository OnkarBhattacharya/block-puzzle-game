# GridLock Game - Refactored Template

Modern React Native GridLock game with a scalable architecture using Hooks and Context API. AdMob and Firebase Analytics are integrated.

## Features

✅ 8x8 grid puzzle game  
✅ Score tracking with high score persistence  
✅ Centralized state management with Context API
✅ Custom Hooks for game logic, settings, and achievements
✅ Screen navigation and modular components
✅ AdMob integration (banner, interstitial, rewarded)  
✅ Firebase Analytics for event tracking
✅ Game over modal with continue option  
✅ Clean, simple UI with themes

## Quick Start

### 1. Install Dependencies

```bash
cd block-puzzle-game
npm install
```

### 2. Run the App

```bash
# iOS
npm run ios

# Android
npm run android

# Web (for testing)
npm run web
```

## Project Structure

```
block-puzzle-game/
├── App.js                      # Root component with navigation and context providers
├── src/
│   ├── components/             # Reusable UI components (GameBoard, Block, etc.)
│   ├── context/
│   │   └── AppContext.js       # Global state management for the app
│   ├── hooks/                  # Custom hooks for managing complex logic
│   │   ├── useGame.js     # Core game logic
│   │   ├── useAppState.js      # Settings management (theme, sound)
│   │   └── useAchievements.js  # Achievement tracking
│   ├── screens/                # Top-level screen components
│   │   ├── GameScreen.js       # Main game screen
│   │   ├── SettingsScreen.js   # App settings
│   │   └── ...                 # Other screens (Achievements, Leaderboard)
│   ├── services/               # Third-party service integrations
│   │   ├── AdManager.js        # AdMob integration
│   │   ├── AnalyticsManager.js # Firebase Analytics integration
│   │   ├── SoundManager.js     # Sound effects
│   │   └── LeaderboardManager.js # Leaderboard logic
│   └── utils/                  # Utility functions and constants (blocks, themes)
├── assets/                     # Images, icons
├── app.json                    # Expo config
└── package.json
```

## Monetization & Analytics

### AdMob Setup

Edit `src/services/AdManager.js` and replace test IDs with your actual AdMob unit IDs.

### Firebase Setup

1.  Create a Firebase project at https://console.firebase.google.com
2.  Follow the instructions to add your iOS and Android apps to the project.
3.  Download the `google-services.json` (for Android) and `GoogleService-Info.plist` (for iOS) configuration files.
4.  Place the files in the correct locations in your project.

## Ad Strategy

- **Banner Ad**: Always visible at bottom (lowest revenue, constant)
- **Interstitial Ad**: Shows every 3 games (medium revenue). Logic for this is implemented in `src/hooks/useGame.js`.
- **Rewarded Video Ad**: Optional continue after game over (highest revenue)

## Development Roadmap

### Phase 1: Core Gameplay (Week 1-2)
- [x] Implement drag-and-drop block placement
- [x] Add 3 random block shapes per turn
- [x] Improve line clearing animation
- [x] Add sound effects
- [x] Implement proper game over detection

### Phase 2: Polish (Week 3)
- [x] Add particle effects for line clears
- [x] Improve UI/UX design
- [x] Add settings menu (sound on/off)
- [x] Create app icon and splash screen
- [x] Add haptic feedback

### Phase 3: Monetization & Analytics (Week 4)
- [x] Integrate real AdMob ads
- [x] Test ad placement and frequency
- [x] Add Firebase Analytics
- [x] Implement A/B testing for ad timing

### Phase 4: Launch (Week 5-6)
- [ ] Create store screenshots
- [ ] Write app description
- [ ] Set up privacy policy
- [ ] Submit to Google Play Store
- [ ] Submit to Apple App Store

## Game Mechanics to Implement

### Block Shapes (Tetris-style)
```javascript
const BLOCKS = [
  [[1, 1, 1]],           // Line 3
  [[1, 1], [1, 1]],      // Square
  [[1, 1, 1, 1]],        // Line 4
  [[1], [1], [1]],       // Vertical 3
  [[1, 1, 0], [0, 1, 1]], // Z-shape
  // Add more shapes
];
```

### Scoring System
- Place block: +1 point per cell
- Clear 1 line: +10 points
- Clear 2 lines: +25 points
- Clear 3+ lines: +50 points
- Combo bonus: +10 per consecutive clear

## Firebase Integration (Optional)

For leaderboards and analytics:

```bash
npm install @react-native-firebase/app @react-native-firebase/analytics
```

## Testing

Test on real devices before launch:
- Different screen sizes
- Ad loading and display
- Performance (60 FPS target)
- Battery usage
- Network conditions

## Revenue Estimates

With 10,000 daily active users:
- 30,000 game sessions/day
- 10,000 interstitial ads
- 2,500 rewarded video ads
- **Expected: $150-300/day**

## Support

For issues or questions:
1. Check Expo documentation: https://docs.expo.dev
2. AdMob setup guide: https://docs.page/invertase/react-native-google-mobile-ads
3. React Native docs: https://reactnative.dev

## License

MIT - Free to use and modify for commercial projects
