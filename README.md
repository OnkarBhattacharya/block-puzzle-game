# GridLock - Production-Ready Block Puzzle Game

Modern React Native block puzzle game built with Expo SDK 54. Features smooth drag-and-drop gameplay, Google AdMob integration, error handling, and optimized React patterns.

## ✨ Features

### Core Gameplay
✅ **Smooth Gameplay** - Drag-and-drop block placement with gesture handling  
✅ **Responsive Design** - Adapts to all screen sizes (iOS & Android)  
✅ **Score System** - High score persistence with AsyncStorage  
✅ **Multiple Themes** - 4 color themes (Default, Dark, Forest, Ocean)  
✅ **Power-ups** - Bomb (3×3 clear) and Shuffle blocks  
✅ **Game State** - Auto-save and resume functionality  
✅ **Sound & Haptics** - Audio feedback and vibration effects  
✅ **Error Handling** - Comprehensive error boundary for stability  

### Player Progression & Engagement
✅ **Level System** - Unlock levels up to 50 through experience gain  
✅ **Daily Streak Tracker** - Track consecutive daily plays with multiplier rewards  
✅ **Experience Multipliers** - Up to 2x EXP from 30+ day streaks  
✅ **Milestone Rewards** - Bonus points at level milestones (1, 5, 10, 20, 50)  
✅ **14 Varied Achievements** - Score, lines, games, combo, power-ups, streaks, and levels  
✅ **Player Stats Display** - Live level, EXP bar, and streak counter in header  

### Game Modes
✅ **Classic Mode** - Traditional endless gameplay  
✅ **Time Attack** - 60-second race to score maximum points  
✅ **Survival Mode** - Extended gameplay with line-clear mechanics  
✅ **Limited Moves** - Complete objectives with only 15 moves  
✅ **Mode Statistics** - Track best scores per mode  

### Visual & Engagement Features
✅ **Floating Score Popups** - Animated score notifications during gameplay  
✅ **Combo Animations** - Line clear notifications with multiplier display  
✅ **Milestone Notifications** - Celebration alerts for achievement unlocks  
✅ **Game Mode Timers** - Visual countdown for Time Attack mode  
✅ **Moves Counter** - Display remaining moves in Limited Moves mode  

### Onboarding
✅ **Interactive Tutorial** - 9-step guided introduction to all features  
✅ **Tutorial Persistence** - Shows once, skippable for returning players  
✅ **Daily Challenges** - Achievement system with progress tracking  
✅ **AdMob Integration** - Banner, interstitial, and rewarded ads  
✅ **Performance** - Optimized with useCallback and React.memo

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

- **Expo SDK**: 54.0.27
- **React**: 18.3.1
- **React Native**: 0.76.5
- **Reanimated**: 3.16.7 (smooth animations)
- **Gesture Handler**: 2.29.1 (drag-and-drop)
- **Google Mobile Ads**: 14.11.0
- **AsyncStorage**: 2.2.0

## ⚡ Recent Improvements

### Phase 2 - Engagement & Retention (December 2025)
**Player Progression System**
- ✅ Level system (1-50 levels, 500 EXP per level)
- ✅ Daily streak tracking with automatic streak updates
- ✅ Streak multiplier rewards (1x → 2x at 30+ days)
- ✅ Milestone rewards at key levels (1, 5, 10, 20, 50)

**Game Modes**
- ✅ Time Attack (60-second race mode)
- ✅ Survival Mode (extended gameplay)
- ✅ Limited Moves (15-move challenges)
- ✅ Mode statistics tracking & best score persistence
- ✅ Game Mode Selector with visual interface

**Enhanced Achievements**
- ✅ Expanded from 5 to 14 achievements
- ✅ New achievement categories: Combo, Power-up, Progression, Streak
- ✅ Achievement tracking across all metrics
- ✅ Animated achievement unlock notifications

**Visual Enhancements**
- ✅ Floating score popups with fade animations
- ✅ Combo multiplier notifications
- ✅ Milestone celebration notifications
- ✅ Game Mode Timer (Time Attack countdown)
- ✅ Moves Counter display
- ✅ Player Stats header component (Level + EXP bar + Streak)

**Onboarding**
- ✅ Interactive 9-step tutorial overlay
- ✅ Tutorial persistence (shows once, skippable)
- ✅ Progress bar showing tutorial completion
- ✅ Comprehensive feature introduction

### Phase 1 - Critical Fixes & Optimizations (December 2025)
- ✅ Fixed Babel version mismatch (12.0.11 → 54.0.8)
- ✅ Updated AsyncStorage, Gesture Handler, React Web
- ✅ Added Error Boundary component for crash prevention
- ✅ Optimized App.js with useCallback hooks
- ✅ Memoized GameBoard and BlockPreview components
- ✅ All security vulnerabilities resolved (0 found)

## 📂 Project Structure

```
src/
├── components/
│   ├── GameBoard.js              # Main game grid with drag-drop + floating popups
│   ├── BlockPreview.js           # Block selection area (memoized)
│   ├── ErrorBoundary.js          # Error boundary for crash handling
│   ├── PauseMenu.js              # Pause overlay
│   ├── PowerUps.js               # Bomb/shuffle buttons
│   ├── Rotation.js               # Block rotation
│   ├── DailyChallenge.js         # Challenge display
│   ├── GameModeSelector.js       # Mode selection modal with stats
│   ├── PlayerStats.js            # Level, EXP bar, and streak display
│   ├── MilestoneNotification.js  # Milestone reward animations
│   ├── GameModeTimer.js          # Time Attack countdown timer
│   ├── MovesCounter.js           # Limited Moves remaining display
│   ├── FloatingPopup.js          # Score popup animation component
│   └── TutorialOverlay.js        # 9-step interactive tutorial
├── context/
│   └── AppContext.js             # Global state (Context API)
├── hooks/
│   ├── useGame.js                # Game logic with progression system
│   └── useAppState.js            # UI state & settings
├── screens/
│   ├── SplashScreen.js
│   ├── SettingsScreen.js
│   ├── AchievementsScreen.js
│   ├── LeaderboardScreen.js
│   └── HowToPlayScreen.js
├── services/
│   ├── AdManager.js              # AdMob integration
│   ├── SoundManager.js           # Audio playback
│   └── AnalyticsManager.js       # Event tracking (stub)
└── utils/
    ├── blocks.js                 # Block shapes (7 Tetris pieces)
    ├── themes.js                 # Color themes
    ├── storage.js                # AsyncStorage helpers (expanded)
    ├── achievements.js           # 14 achievement definitions
    ├── challenges.js             # Daily challenge logic
    ├── progression.js            # Level configs, game modes, multipliers
    └── constants.js              # Game constants
```

## 🎮 Game Mechanics

### Block Placement
- Drag blocks from preview area onto 8×8 grid
- Blocks cannot overlap or go out of bounds
- 3 random blocks available at a time
- Web support: Click to place blocks

### Scoring
- **Place block**: +1 point per cell
- **Clear line**: +10 points × combo multiplier
- **Combo**: Multiplier increases with consecutive clears
- **Experience**: Base score ÷ 100, multiplied by daily streak bonus

### Combo System
- Multiplier starts at 1x and increases with each line clear
- Resets to 1x if a block is placed without clearing lines
- Visual indicator displays current multiplier (x2, x3, etc.)

### Power-ups (1 per game)
- **Bomb**: Clears 3×3 area (tracked for achievements)
- **Shuffle**: Regenerates available blocks (tracked for achievements)

### Game Over
- No valid moves for any available block
- Option to watch rewarded ad to continue (+50 points)
- Game Over screen shows final score and best score

### Experience & Leveling
- Players gain EXP from each game completion
- EXP calculation: `(Score ÷ 100) × Streak Multiplier`
- Daily streak multiplier: 1x → 1.1x (3 days) → 1.25x (7 days) → 1.5x (14 days) → 2x (30+ days)
- One level gained per 500 EXP
- Experience bar shows progress to next level
- Level cap: 50

### Daily Streak System
- Automatically tracked each time you play
- Continues from consecutive days
- Resets after missing a day
- Provides EXP multiplier bonus (up to 2x)
- Contributes to "Week Warrior" achievement at 7 days

## 🎯 Game Modes

Switch between game modes via the mode selector button in the header.

### Classic Mode (🎮)
- Traditional endless gameplay
- No time limits or move restrictions
- Play until no valid moves remain
- Best for high-score pursuits

### Time Attack Mode (⏱️)
- Race against a 60-second timer
- Score as many points as possible before time runs out
- Timer visible in top corner with color change when time is low (≤10s)
- Automatic game over when time expires
- Best scores tracked per mode

### Survival Mode (💪)
- Extended gameplay mechanics
- Focus on line clears to maintain play
- Statistics tracked separately from Classic mode
- Ideal for skill development

### Limited Moves Mode (🎯)
- Complete objectives with only 15 moves
- Moves counter displays remaining moves
- Increases with each block placement
- Game ends when moves reach 0
- Perfect for strategic thinking

## 🏆 Achievement System

**14 Total Achievements**

### Score Achievements
- **Score 1000**: Reach 1000 in single game
- **Score 5000**: Reach 5000 in single game
- **Score 10000**: Reach 10000 in single game

### Line Clear Achievements
- **Clear 10 lines**: Cumulative lifetime progress
- **Clear 100 lines**: Cumulative lifetime progress
- **Clear 500 lines**: Cumulative lifetime progress

### Gameplay Achievements
- **Play 10 games**: Cumulative game count
- **Play 50 games**: Cumulative game count

### Skill Achievements
- **Combo Master**: Achieve 5x combo multiplier
- **Power Up Master**: Use 20 power-ups total
- **Daily Driver**: Complete daily challenge

### Progression Achievements
- **Rising Star**: Reach level 5
- **Veteran Player**: Reach level 10
- **Week Warrior**: Achieve 7-day play streak

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

### Adjust Progression System
Edit `src/utils/progression.js`:
```javascript
export const LEVEL_CONFIG = {
  expPerLevel: 500,  // EXP needed per level
  maxLevel: 50,      // Maximum level
};

export const DAILY_STREAK_REWARDS = [
  { days: 1, multiplier: 1 },
  { days: 3, multiplier: 1.1 },
  { days: 7, multiplier: 1.25 },
  { days: 14, multiplier: 1.5 },
  { days: 30, multiplier: 2 },   // Adjust multipliers here
];

export const MILESTONE_REWARDS = {
  level_10: { level: 10, reward: 1000, message: 'Custom message' },
  // ...
};
```

### Customize Game Modes
Edit `src/utils/progression.js`:
```javascript
export const GAME_MODES = {
  TIME_ATTACK: {
    id: 'timeAttack',
    name: 'Time Attack',
    description: 'Score as much as possible in 60 seconds',
    icon: '⏱️',
    duration: 60,  // Change timer duration
  },
  LIMITED_MOVES: {
    id: 'limitedMoves',
    name: 'Limited Moves',
    description: 'Complete with only 15 moves',
    icon: '🎯',
    moves: 15,  // Change move limit
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

### Modify Achievement Requirements
Edit `src/utils/achievements.js`:
```javascript
export const achievements = {
  score_10000: {
    id: 'score_10000',
    title: 'Score 10000',
    description: 'Reach a score of 10000 in a single game.',
    unlocked: false,
  },
  // Customize achievement thresholds in useGame.js checkAchievements()
};
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

### Core Gameplay
- [ ] Block placement on all grid positions
- [ ] Line clearing (horizontal & vertical)
- [ ] Combo multiplier calculation & display
- [ ] Game over detection
- [ ] High score persistence

### Progression System
- [ ] Experience gain after each game
- [ ] Level up progression (1-50)
- [ ] EXP bar display and calculation
- [ ] Daily streak tracking (consecutive days)
- [ ] Streak multiplier bonus application
- [ ] Milestone rewards notification display
- [ ] Milestone rewards point addition

### Game Modes
- [ ] Classic mode gameplay (default)
- [ ] Time Attack mode timer countdown
- [ ] Time Attack mode auto game-over at 0s
- [ ] Survival mode extended mechanics
- [ ] Limited Moves mode move counter
- [ ] Limited Moves mode game-over at 0 moves
- [ ] Game Mode selector modal
- [ ] Mode statistics persistence
- [ ] Best scores per mode tracking
- [ ] Mode indicator in header

### Achievements
- [ ] All 14 achievements unlock correctly
- [ ] Achievement notifications display
- [ ] Achievement persistence across sessions
- [ ] Multiple achievement categories trigger

### Visual Feedback
- [ ] Floating score popups appear & animate
- [ ] Combo notifications display correctly
- [ ] Milestone notifications animate
- [ ] Game Mode Timer shows in Time Attack
- [ ] Moves Counter shows in Limited Moves
- [ ] Player Stats component displays level/EXP/streak
- [ ] EXP bar fills proportionally

### Onboarding & Tutorial
- [ ] Tutorial displays on first launch
- [ ] Tutorial hides on returning players
- [ ] Tutorial steps progress correctly
- [ ] Back/Next buttons work
- [ ] Skip button exits tutorial
- [ ] Tutorial completion persists
- [ ] Progress bar updates with each step

### Settings & Persistence
- [ ] Sound effects toggle
- [ ] Haptic feedback toggle
- [ ] Theme switching
- [ ] Theme persistence
- [ ] Power-ups functionality
- [ ] Player data persistence across sessions
- [ ] Tutorial status persistence

### Advertising
- [ ] Ad loading (banner, interstitial, rewarded)
- [ ] Banner ad placement
- [ ] Interstitial ad frequency (every 3 games)
- [ ] Rewarded video "continue game" option

### UI & Responsiveness
- [ ] Responsive design on different screen sizes
- [ ] Web platform support (click-to-place)
- [ ] Native platform support (drag-and-drop)
- [ ] Theme application across all components
- [ ] Header layout with new stats display
- [ ] Game board centering and scaling

## 📚 API Reference

### useGame Hook
Main game logic hook providing all game state and functions.

**Key State Variables:**
```javascript
const {
  playerLevel,           // Current player level (1-50)
  totalExp,              // Total experience earned
  dailyStreak,           // Days in current play streak
  gameMode,              // Current game mode ID
  modeStats,             // Best scores per game mode
  movesRemaining,        // Moves left in Limited Moves mode
  milestoneMessage,      // Current milestone notification
  // ... standard game state
} = useContext(AppContext);
```

**Key Functions:**
```javascript
addExperience(exp)       // Add EXP to player
checkMilestoneReward(level)  // Trigger milestone notification
setGameMode(modeId)      // Change game mode
```

### Storage Functions (`src/utils/storage.js`)
```javascript
// Progression
await updateDailyStreak()           // Update daily streak
await getDailyStreak()              // Get current streak
await savePlayerLevel(level, exp)   // Save level & EXP
await getPlayerLevel()              // Get level & EXP

// Mode Statistics
await saveModeStats(stats)          // Save mode statistics
await getModeStats()                // Get mode statistics

// Tutorial
await markTutorialComplete()        // Mark tutorial as done
await isTutorialCompleted()         // Check tutorial status
```

### Progression Utilities (`src/utils/progression.js`)
```javascript
calculateLevel(totalExp)            // Get current level from EXP
getExpProgress(totalExp)            // Get {level, progress, needed, percentage}
getStreakMultiplier(days)           // Get EXP multiplier for streak

// Constants
LEVEL_CONFIG                        // Level & EXP configuration
GAME_MODES                          // Available game modes
MILESTONE_REWARDS                   // Level milestone rewards
DAILY_STREAK_REWARDS                // Streak multiplier tiers
```

## 📝 Known Limitations

- **Firebase Analytics**: Removed (incompatible with Expo managed workflow)
- **Remote Config**: Hardcoded values instead
- **Native Modules**: Stay in managed workflow to avoid TurboModule errors
- **Time Attack Mode**: Timer continues on pause (by design - adds strategy)

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

### Progression & Leveling Issues
- **EXP not increasing**: Check `useGame.js` handleGameOver function
- **Level not unlocking**: Verify `LEVEL_CONFIG.expPerLevel` in `src/utils/progression.js`
- **Streak not updating**: Confirm `updateDailyStreak()` is called in game over handler
- **Achievements not triggering**: Check achievement conditions in `checkAchievements()` function

### Game Mode Issues
- **Timer not counting down**: Ensure `gameMode` is set to `'timeAttack'`
- **Moves not decrementing**: Verify `setMovesRemaining()` is called in `handleBlockPlaced()`
- **Mode stats not saving**: Check `saveModeStats()` is called in `handleGameOver()`
- **Mode selector not appearing**: Ensure `GameModeSelector` component is rendered in `App.js`

### Tutorial Issues
- **Tutorial showing repeatedly**: Check `isTutorialCompleted()` is called on app start
- **Tutorial not dismissing**: Verify `markTutorialComplete()` is called in `handleTutorialComplete()`
- **Tutorial appearing for returning users**: Clear AsyncStorage or test with `@tutorial_completed` key removed

### Visual Feedback Issues
- **Popups not appearing**: Check `FloatingPopup` is rendered in `GameBoard`
- **Milestone notifications not showing**: Verify `setMilestoneMessage()` is called
- **Stats not updating**: Check `PlayerStats` component receives latest props from context
- **Animations stuttering**: Reduce animation duration or optimize component rendering

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev)
- [AdMob Setup Guide](https://docs.page/invertase/react-native-google-mobile-ads)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

## 📄 License

MIT - Free to use and modify for commercial projects
