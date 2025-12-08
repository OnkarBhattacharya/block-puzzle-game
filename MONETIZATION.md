# Monetization Guide

## Ad Revenue Breakdown

### Ad Types by eCPM (earnings per 1000 impressions)

1. **Rewarded Video**: $10-50 eCPM (BEST)
2. **Interstitial**: $2-10 eCPM
3. **Banner**: $0.50-3 eCPM (WORST)

## Optimal Ad Strategy

### Current Implementation

```
Game Session Flow:
1. User plays game
2. Game over
3. Every 3rd game → Show Interstitial Ad
4. Option: Watch Rewarded Ad to continue
5. Banner ad always visible at bottom
```

### Ad Frequency Rules

**DO:**
- Show interstitial every 2-3 games
- Offer rewarded ads as optional bonuses
- Keep banner ads non-intrusive

**DON'T:**
- Show ads every game (users will uninstall)
- Force rewarded ads
- Block gameplay with ads

## Revenue Calculator

### Example: 10,000 Daily Active Users

```
Assumptions:
- 3 game sessions per user per day
- 30,000 total sessions
- 10,000 interstitial ads (every 3rd game)
- 25% watch rewarded ads = 2,500 views
- Banner impressions = 30,000

Revenue:
- Interstitial: 10,000 × $5 eCPM = $50
- Rewarded: 2,500 × $30 eCPM = $75
- Banner: 30,000 × $1 eCPM = $30

Total: $155/day = $4,650/month
```

### Scale Projections

| Daily Users | Monthly Revenue |
|-------------|-----------------|
| 1,000       | $465            |
| 5,000       | $2,325          |
| 10,000      | $4,650          |
| 50,000      | $23,250         |
| 100,000     | $46,500         |

## AdMob Setup Steps

### 1. Create AdMob Account
- Go to https://admob.google.com
- Sign in with Google account
- Accept terms

### 2. Add Your App
- Click "Apps" → "Add App"
- Select platform (iOS/Android)
- Enter app name
- Note your App ID

### 3. Create Ad Units

Create 3 ad units:

**Banner Ad:**
- Format: Banner
- Name: "Main Banner"
- Copy Ad Unit ID

**Interstitial Ad:**
- Format: Interstitial
- Name: "Game Over Interstitial"
- Copy Ad Unit ID

**Rewarded Video:**
- Format: Rewarded
- Name: "Continue Reward"
- Copy Ad Unit ID

### 4. Update Code

Edit `src/services/AdManager.js`:

```javascript
const AD_UNITS = {
  banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  rewarded: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
};
```

### 5. Test Ads

Use test IDs during development:
```javascript
import { TestIds } from 'react-native-google-mobile-ads';

// Use TestIds.BANNER, TestIds.INTERSTITIAL, TestIds.REWARDED
```

### 6. Enable Real Ads

Before publishing:
- Replace test IDs with real ad unit IDs
- Test on real device
- Verify ads load correctly

## Optimization Tips

### Increase Revenue

1. **Improve Retention**
   - Better gameplay = more sessions = more ads
   - Target 3+ sessions per user per day

2. **Optimize Ad Placement**
   - A/B test interstitial frequency (every 2 vs 3 games)
   - Test rewarded ad incentives (50 vs 100 points)

3. **Increase Rewarded Ad Take Rate**
   - Make rewards valuable (extra life, power-ups)
   - Show at strategic moments (close to high score)

4. **Geographic Targeting**
   - US/UK/Canada users = higher eCPM
   - Market in high-value regions

### Track Performance

Use Firebase Analytics:
```bash
npm install @react-native-firebase/analytics
```

Track:
- Ad impressions
- Ad clicks
- Revenue per user
- Session length
- Retention rate

## Legal Requirements

### Privacy Policy (REQUIRED)

Must include:
- Data collection disclosure
- AdMob/Google data usage
- User rights (GDPR/CCPA)

Use generator: https://app-privacy-policy-generator.firebaseapp.com

### App Store Requirements

**Google Play:**
- Privacy policy URL
- Content rating
- Target audience

**Apple App Store:**
- Privacy nutrition labels
- App tracking transparency
- Age rating

## Payment Setup

### AdMob Payments

1. Reach $100 threshold
2. Add payment method (bank transfer/wire)
3. Verify identity
4. Payments sent monthly (21st-26th)

### Tax Information

- US: W-9 form
- Non-US: W-8BEN form
- May require tax withholding

## Next Steps

1. ✅ Implement core gameplay
2. ✅ Test with AdMob test ads
3. ✅ Create AdMob account
4. ✅ Generate ad unit IDs
5. ✅ Update code with real IDs
6. ✅ Create privacy policy
7. ✅ Test on real devices
8. ✅ Publish to stores
9. ✅ Monitor revenue in AdMob dashboard

## Resources

- AdMob Help: https://support.google.com/admob
- Best Practices: https://admob.google.com/home/resources/
- Policy Center: https://support.google.com/admob/answer/6128543
