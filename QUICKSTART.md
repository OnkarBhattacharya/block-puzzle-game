# Quick Start Guide

## 1. Install Node.js
Download from https://nodejs.org (LTS version)

## 2. Install Expo CLI
```bash
npm install -g expo-cli
```

## 3. Setup Project
```bash
cd block-puzzle-game
npm install
```

## 4. Run on Your Phone (Easiest)

### Install Expo Go App
- iOS: https://apps.apple.com/app/expo-go/id982107779
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent

### Start Development Server
```bash
npm start
```

Scan QR code with:
- iOS: Camera app
- Android: Expo Go app

## 5. Run on Simulator/Emulator

### iOS (Mac only)
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Next Steps

1. **Test the game** - Tap cells to fill them, clear lines to score
2. **Customize colors** - Edit styles in `App.js` and components
3. **Add real gameplay** - Implement block shapes and drag-drop
4. **Setup AdMob** - Follow README.md monetization section
5. **Build for stores** - Use `expo build:android` or `expo build:ios`

## Common Issues

### "Command not found: expo"
```bash
npm install -g expo-cli
```

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### Port already in use
```bash
npm start -- --port 19001
```

## Resources

- Expo Docs: https://docs.expo.dev
- React Native: https://reactnative.dev
- AdMob Setup: https://admob.google.com
