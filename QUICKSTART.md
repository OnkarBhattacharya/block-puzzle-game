# Quick Start Guide

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- npm
- Expo Go app on your phone (optional for physical device testing)

## Installation

```bash
cd block-puzzle-game
npm install
npm start --clear
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
   - iOS: Use Camera app or Expo Go app
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

- **Drag blocks** from bottom preview onto grid to place them
- **Tap Pause** button to access settings and resume
- **Clear lines** by completing full rows or columns
- **Earn points** for cleared lines (bonus for combos)
- **Watch ads** to continue after game over (optional rewarded ads)

## Building for Production

### Update Configuration

Before deploying to App Store or Google Play, update `app.json`:
```json
{
  "expo": {
    "owner": "yourorganization",
    "slug": "gridlock",
    "plugins": ["react-native-google-mobile-ads"]
  }
}
```

### Get Production Ad Unit IDs

Replace test ad IDs in `src/services/AdManager.js` with your AdMob production unit IDs:
- iOS and Android Banner, Interstitial, and Rewarded ad unit IDs
- Visit [Google AdMob Console](https://admob.google.com) to get your IDs

### Build Commands

```bash
# Build for App Store (ipa)
eas build --platform ios

# Build for Google Play (aab)
eas build --platform android
```

## Troubleshooting

- **Connection failed?** Ensure your device is on the same WiFi network
- **QR code not scanning?** Try typing the URL manually or use tunneling: `npm start -- --tunnel`
- **Build errors?** Clear cache: `npm start --clear`
- **Ad errors?** Replace test ad unit IDs with your production IDs

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
