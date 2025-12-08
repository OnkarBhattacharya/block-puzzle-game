# Firebase Studio Import Guide

## Method 1: Direct Upload (Recommended)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/block-puzzle-game.git
   git push -u origin main
   ```

2. **Import to Firebase Studio**
   - Open Firebase Console: https://console.firebase.google.com
   - Click "Add project" or select existing project
   - Go to "Hosting" → "Get started"
   - Connect your GitHub repository
   - Select branch: `main`
   - Build command: `npm run build`
   - Output directory: `web-build`

## Method 2: Firebase CLI

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy --only hosting
```

## Method 3: Manual ZIP Upload

If Firebase Studio import fails:

1. Create a `.zip` of your project
2. Upload via Firebase Console → Hosting → Manual deploy
3. Or use: `firebase deploy --only hosting`

## Troubleshooting

**"No repository found"**
- Ensure `.firebaserc` and `firebase.json` exist
- Push code to GitHub first

**"Build failed"**
- Run `npm install` locally first
- Check `package.json` has `build` script

**"Invalid project structure"**
- Verify `firebase.json` points to correct output directory
