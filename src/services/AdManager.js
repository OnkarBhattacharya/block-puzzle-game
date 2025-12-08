// AdMob Integration Service
// Replace with your actual AdMob IDs from Google AdMob console

const AdManager = {
  initialized: false,

  // Initialize AdMob
  initialize: async () => {
    try {
      // Uncomment when react-native-google-mobile-ads is installed
      // const { GoogleMobileAds } = require('react-native-google-mobile-ads');
      // await GoogleMobileAds().initialize();
      AdManager.initialized = true;
      console.log('AdMob initialized');
    } catch (error) {
      console.error('AdMob initialization failed:', error);
    }
  },

  // Show Interstitial Ad (between games)
  showInterstitial: () => {
    if (!AdManager.initialized) {
      console.log('Interstitial ad would show here');
      return;
    }

    // Uncomment when ready to use real ads
    /*
    const { InterstitialAd, AdEventType, TestIds } = require('react-native-google-mobile-ads');
    
    const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
      requestNonPersonalizedAdsOnly: true,
    });

    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show();
    });

    interstitial.load();
    */
  },

  // Show Rewarded Video Ad (for continue/bonuses)
  showRewarded: (onReward) => {
    if (!AdManager.initialized) {
      console.log('Rewarded ad would show here');
      onReward(); // Simulate reward for testing
      return;
    }

    // Uncomment when ready to use real ads
    /*
    const { RewardedAd, RewardedAdEventType, TestIds } = require('react-native-google-mobile-ads');
    
    const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
      requestNonPersonalizedAdsOnly: true,
    });

    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });

    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      onReward();
    });

    rewarded.load();
    */
  },

  // Banner Ad Component (use in App.js)
  getBannerComponent: () => {
    // Uncomment when ready to use real ads
    /*
    const { BannerAd, BannerAdSize, TestIds } = require('react-native-google-mobile-ads');
    
    return (
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    );
    */
    return null;
  },
};

export default AdManager;
