import React from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType, AppOpenAd } from 'react-native-google-mobile-ads';

const adUnitIds = Platform.select({
  ios: {
    banner: 'ca-app-pub-5692083748872435/5312178602',
    interstitial: 'ca-app-pub-5692083748872435/6657049862',
    rewarded: 'ca-app-pub-5692083748872435/6442083980',
    appOpen: 'ca-app-pub-5692083748872435/6536069868',
  },
  android: {
    banner: 'ca-app-pub-5692083748872435/4605601590',
    interstitial: 'ca-app-pub-5692083748872435/8232294910',
    rewarded: 'ca-app-pub-5692083748872435/8173968055',
    appOpen: 'ca-app-pub-5692083748872435/7953642053',
  },
});

const AdManager = {
  initialized: false,

  // Initialize AdMob
  initialize: async () => {
    try {
      const { GoogleMobileAds } = require('react-native-google-mobile-ads');
      await GoogleMobileAds().initialize();
      AdManager.initialized = true;
      console.log('AdMob initialized');
    } catch (error) {
      console.error('AdMob initialization failed:', error);
    }
  },

  // Show App Open Ad
  showAppOpenAd: () => {
    if (!AdManager.initialized) {
      console.log('AdMob not initialized, cannot show app open ad.');
      return;
    }

    const appOpenAd = AppOpenAd.createForAdRequest(adUnitIds.appOpen, {
      requestNonPersonalizedAdsOnly: true,
    });

    appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      appOpenAd.show();
    });

    appOpenAd.load();
  },

  // Show Interstitial Ad (between games)
  showInterstitial: () => {
    if (!AdManager.initialized) {
      console.log('AdMob not initialized, cannot show interstitial ad.');
      return;
    }

    const interstitial = InterstitialAd.createForAdRequest(adUnitIds.interstitial, {
      requestNonPersonalizedAdsOnly: true,
    });

    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show();
    });

    interstitial.load();
  },

  // Show Rewarded Video Ad (for continue/bonuses)
  showRewarded: (onReward) => {
    if (!AdManager.initialized) {
      console.log('AdMob not initialized, cannot show rewarded ad.');
      onReward(); // Simulate reward for testing
      return;
    }

    const rewarded = RewardedAd.createForAdRequest(adUnitIds.rewarded, {
      requestNonPersonalizedAdsOnly: true,
    });

    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });

    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      onReward();
    });

    rewarded.load();
  },

  // Banner Ad Component (use in App.js)
  getBannerComponent: () => {
    return (
      <BannerAd
        unitId={adUnitIds.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    );
  },
};

export default AdManager;
