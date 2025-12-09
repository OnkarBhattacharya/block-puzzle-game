# Monetization Guide

## Current Implementation

### ✅ Integrated Features
- Google AdMob SDK 14.3.2
- Banner ads (bottom of screen)
- Interstitial ads (every 3 games)
- Rewarded video ads (continue after game over)
- Test ad IDs configured
- Error handling and fallbacks

### Ad Flow

```
User Journey:
1. Opens app → Banner ad loads at bottom
2. Plays game → Drag blocks, clear lines, score points
3. Game over → Every 3rd game shows interstitial ad
4. Option: Watch rewarded ad → Continue game (+50 points)
5. Repeat
```

## Revenue Model

### Ad Types & eCPM

| Ad Type       | eCPM Range | Frequency      | Priority |
|---------------|------------|----------------|----------|
| Rewarded      | $10-50     | Optional       | HIGH     |
| Interstitial  | $2-10      | Every 3 games  | MEDIUM   |
| Banner        | $0.50-3    | Always visible | LOW      |

### Revenue Calculator

**10,000 Daily Active Users:**
```
Assumptions:
- 3 sessions per user = 30,000 sessions
- Interstitial: 10,000 views (every 3rd game)
- Rewarded: 2,500 views (25% take rate)
- Banner: 30,000 impressions

Daily Revenue:
- Interstitial: 10,000 × $5 eCPM = $50
- Rewarded: 2,500 × $30 eCPM = $75
- Banner: 30,000 × $1 eCPM = $30
Total: $155/day = $4,650/month
```

### Scale Projections

| Daily Users | Monthly Revenue | Annual Revenue |
|-------------|-----------------|----------------|
| 1,000       | $465            | $5,580         |
| 5,000       | $2,325          | $27,900        |
| 10,000      | $4,650          | $55,800        |
| 50,000      | $23,250         | $279,000       |
| 100,000     | $46,500         | $558,000       |

## AdMob Setup

### Step 1: Create AdMob Account

1. Go to https://admob.google.com
2. Sign in with Google account
3. Accept terms and conditions

### Step 2: Add Your App

1. Click **Apps** → **Add App**
2. Select platform (iOS/Android)
3. Enter app name: "GridLock"
4. Copy **App ID** (format: ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX)

### Step 3: Create Ad Units

Create 3 ad units per platform:

**Banner Ad:**
- Format: Banner (320×50)
- Name: "GridLock Banner"
- Copy Ad Unit ID

**Interstitial Ad:**
- Format: Interstitial (Full Screen)
- Name: "GridLock Interstitial"
- Copy Ad Unit ID

**Rewarded Video:**
- Format: Rewarded
- Name: "GridLock Rewarded"
- Copy Ad Unit ID

### Step 4: Update Code

**File: `src/services/AdManager.js`**

Replace test IDs with your real IDs:

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

**File: `app.json`**

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

### Step 5: Test

```bash
npm install
npx expo start --clear
```

Test ads will show during development. Real ads appear after publishing.

## Optimization Strategies

### 1. Increase Rewarded Ad Take Rate

**Current:** 25% of users watch rewarded ads

**Improvements:**
- Increase reward value (50 → 100 points)
- Add power-ups as rewards (extra bomb/shuffle)
- Show at strategic moments (near high score)
- Better UI/UX for ad prompt

**Code:** Edit `App.js`
```javascript
const watchAdForContinue = () => {
  AdManager.showRewarded(() => {
    setGameOver(false);
    setScore(score + 100); // Increase reward
  });
};
```

### 2. Optimize Ad Frequency

**Current:** Interstitial every 3 games

**Test:** Every 2 games (may increase revenue but hurt retention)

**Code:** Edit `src/hooks/useGame.js`
```javascript
if (newGamesPlayed % 2 === 0) { // Change from 3 to 2
  AdManager.showInterstitial();
}
```

**Monitor:** Retention rate vs revenue

### 3. Improve Retention

More sessions = more ad impressions

**Strategies:**
- Daily challenges with rewards
- Achievement system
- Leaderboards
- Push notifications (reminders)
- Social sharing features

### 4. Geographic Targeting

Higher eCPM in certain regions:
- US/Canada: $8-15 eCPM
- UK/Australia: $6-12 eCPM
- Europe: $4-8 eCPM
- Asia: $1-4 eCPM

**Strategy:** Market heavily in high-value regions

## Legal Requirements

### Privacy Policy (REQUIRED)

Must disclose:
- AdMob data collection
- Google Advertising ID usage
- User tracking
- GDPR/CCPA compliance

**Generate:** https://app-privacy-policy-generator.firebaseapp.com

### App Store Requirements

**Google Play:**
- Privacy policy URL
- Ads content rating
- Target audience (13+)
- Data safety section

**Apple App Store:**
- App Tracking Transparency (ATT)
- Privacy nutrition labels
- Age rating (9+)
- Ad identifier usage disclosure

## Payment Setup

### AdMob Payments

1. **Threshold:** $100 minimum
2. **Payment Method:** Bank transfer or wire
3. **Verification:** ID and address verification required
4. **Schedule:** Monthly (21st-26th of month)
5. **Tax Forms:** W-9 (US) or W-8BEN (non-US)

### Expected Timeline

- Month 1: $0 (building user base)
- Month 2: $50-200 (initial traction)
- Month 3: $200-500 (growth phase)
- Month 4+: $500-2,000+ (scale phase)

## Best Practices

### ✅ DO:
- Test ads on real devices
- Use test IDs during development
- Monitor AdMob dashboard daily
- Respond to policy violations quickly
- Keep ad frequency reasonable
- Provide value before showing ads
- Make rewarded ads optional

### ❌ DON'T:
- Click your own ads (instant ban)
- Encourage users to click ads
- Show ads too frequently
- Hide close buttons
- Use misleading ad placements
- Force rewarded ads
- Violate AdMob policies

## Monitoring Performance

### Key Metrics

Track in AdMob dashboard:
- **Impressions:** Total ad views
- **eCPM:** Earnings per 1000 impressions
- **Fill Rate:** % of ad requests filled
- **Click-Through Rate (CTR):** % of ads clicked
- **Revenue:** Daily/monthly earnings

### Analytics Events

Currently logged (console only):
- `game_over` - Score and continuation
- `block_placed` - Lines cleared
- `watch_ad_for_continue` - Rewarded ad viewed

**Future:** Integrate Firebase Analytics for real tracking

## Troubleshooting

### Ads Not Loading
- Check internet connection
- Verify ad unit IDs are correct
- Check AdMob account status
- Review policy compliance
- Test with test IDs first

### Low eCPM
- Improve app quality (higher ratings)
- Increase user engagement
- Target high-value regions
- Enable mediation (advanced)

### Account Suspended
- Review AdMob policies
- Check for invalid traffic
- Appeal if wrongly suspended
- Never click own ads

## Resources

- [AdMob Help Center](https://support.google.com/admob)
- [Policy Center](https://support.google.com/admob/answer/6128543)
- [Best Practices](https://admob.google.com/home/resources/)
- [Payment Guide](https://support.google.com/admob/answer/2784628)

## Next Steps

1. ✅ Create AdMob account
2. ✅ Generate ad unit IDs
3. ✅ Update code with real IDs
4. ✅ Create privacy policy
5. ✅ Test on real devices
6. ✅ Build production version
7. ✅ Submit to app stores
8. ✅ Monitor revenue in dashboard
9. ✅ Optimize based on data
10. ✅ Scale user acquisition
