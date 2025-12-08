# Block Puzzle Game - Starter Template

Minimal React Native block puzzle game with AdMob monetization ready.

## Features

✅ 8x8 grid puzzle game  
✅ Score tracking with high score persistence  
✅ AdMob integration structure (banner, interstitial, rewarded)  
✅ Game over modal with continue option  
✅ Clean, simple UI  

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
├── App.js                      # Main app component
├── src/
│   ├── components/
│   │   ├── GameBoard.js        # 8x8 grid game logic
│   │   └── BlockPreview.js     # Next blocks preview
│   ├── services/
│   │   └── AdManager.js        # AdMob integration
│   └── utils/
│       └── storage.js          # AsyncStorage helpers
├── assets/                     # Images, icons
├── app.json                    # Expo config
└── package.json
```

## Monetization Setup

### Step 1: Create AdMob Account
1. Go to https://admob.google.com
2. Create account and add your app
3. Generate ad unit IDs for:
   - Banner Ad
   - Interstitial Ad
   - Rewarded Video Ad

### Step 2: Configure AdMob

Edit `src/services/AdManager.js` and replace test IDs:

```javascript
// Replace TestIds with your actual AdMob unit IDs
const BANNER_ID = 'ca-app-pub-xxxxx/xxxxx';
const INTERSTITIAL_ID = 'ca-app-pub-xxxxx/xxxxx';
const REWARDED_ID = 'ca-app-pub-xxxxx/xxxxx';
```

### Step 3: Uncomment Ad Code

Uncomment the ad implementation code in `AdManager.js` once you have real ad unit IDs.

## Ad Strategy

- **Banner Ad**: Always visible at bottom (lowest revenue, constant)
- **Interstitial Ad**: Shows every 3 games (medium revenue)
- **Rewarded Video Ad**: Optional continue after game over (highest revenue)

## Development Roadmap

### Phase 1: Core Gameplay (Week 1-2)
- [ ] Implement drag-and-drop block placement
- [ ] Add 3 random block shapes per turn
- [ ] Improve line clearing animation
- [ ] Add sound effects
- [ ] Implement proper game over detection

### Phase 2: Polish (Week 3)
- [ ] Add particle effects for line clears
- [ ] Improve UI/UX design
- [ ] Add settings menu (sound on/off)
- [ ] Create app icon and splash screen
- [ ] Add haptic feedback

### Phase 3: Monetization (Week 4)
- [ ] Integrate real AdMob ads
- [ ] Test ad placement and frequency
- [ ] Add Firebase Analytics
- [ ] Implement A/B testing for ad timing

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
