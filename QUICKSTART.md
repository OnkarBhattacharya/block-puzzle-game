# Quick Start Guide

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- npm or yarn
- Expo Go app on your phone (optional)

## Installation

```bash
cd block-puzzle-game
npm install
```

## Running the Game

### Option 1: Physical Device (Recommended)

1. **Install Expo Go**
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start Server**
   ```bash
   npm start
   ```

3. **Scan QR Code**
   - iOS: Use Camera app
   - Android: Use Expo Go app

### Option 2: iOS Simulator (Mac Only)

```bash
npm run ios
```

### Option 3: Android Emulator

```bash
npm run android
```

## Game Controls

- **Drag blocks** from bottom preview onto grid
- **Tap Pause** to access settings
- **Clear lines** by filling rows or columns
- **Use power-ups** strategically (bomb/shuffle)

## Testing Features

✅ Drag-and-drop block placement  
✅ Line clearing animation  
✅ Score tracking  
✅ Sound effects (toggle in settings)  
✅ Haptic feedback  
✅ Theme switching  
✅ Game over and restart  
✅ Ad placeholders (test ads)

## Common Issues

### Module Resolution Error
```bash
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

### TurboModule Error
```bash
rm -rf ios android
npx expo start --clear
```

### Port Already in Use
```bash
npx expo start --port 19001
```

### Ads Not Showing
Normal during development - using test ad IDs.

## Customization

### Change Colors
Edit `src/utils/themes.js`

### Adjust Grid Size
Edit `src/components/GameBoard.js`:
```javascript
const GRID_SIZE = 8; // Change this
```

### Change Ad Frequency
Edit `src/hooks/useGame.js`:
```javascript
if (newGamesPlayed % 3 === 0) { // Change 3
  AdManager.showInterstitial();
}
```

## Next Steps

1. ✅ Test all game features
2. ✅ Customize themes and colors
3. ✅ Setup AdMob account (see MONETIZATION.md)
4. ✅ Replace test ad IDs
5. ✅ Create privacy policy
6. ✅ Build for production (see README.md)
7. ✅ Submit to app stores

## Development Tips

- Changes hot-reload automatically
- Check terminal for errors
- Test on real device before publishing
- Use `npx expo start --clear` to clear cache
- Monitor performance with React DevTools

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build Android
eas build --platform android

# Build iOS
eas build --platform ios
```

## Support

- Check terminal for error messages
- Review [Expo Forums](https://forums.expo.dev)
- See [Troubleshooting](README.md#troubleshooting) in README

## Performance Tips

- Test on real devices (simulators are slower)
- Target 60 FPS gameplay
- Monitor memory usage
- Optimize images if added
- Test on low-end devices

## Ready to Publish?

- [ ] All features tested
- [ ] Real AdMob IDs configured
- [ ] Privacy policy created
- [ ] App icons and splash screen ready
- [ ] Tested on multiple devices
- [ ] Performance optimized
- [ ] Store listings prepared
