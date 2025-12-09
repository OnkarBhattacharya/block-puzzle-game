import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';

let BannerAd, BannerAdSize, InterstitialAd, RewardedAd, AdEventType, RewardedAdEventType, GoogleMobileAds;

try {
  const ads = require('react-native-google-mobile-ads');
  BannerAd = ads.BannerAd;
  BannerAdSize = ads.BannerAdSize;
  InterstitialAd = ads.InterstitialAd;
  RewardedAd = ads.RewardedAd;
  AdEventType = ads.AdEventType;
  RewardedAdEventType = ads.RewardedAdEventType;
  GoogleMobileAds = ads.GoogleMobileAds;
} catch (e) {
  console.log('AdMob not available:', e.message);
}

const adUnitIds = Platform.select({
  ios: {
    banner: 'ca-app-pub-3940256099942544/2934735716',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
    rewarded: 'ca-app-pub-3940256099942544/1712485313',
  },
  android: {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    rewarded: 'ca-app-pub-3940256099942544/5224354917',
  },
});

const AdManager = {
  initialized: false,

  initialize: async () => {
    if (!GoogleMobileAds) {
      console.log('AdMob SDK not available');
      return;
    }
    
    try {
      await GoogleMobileAds().initialize();
      AdManager.initialized = true;
      console.log('AdMob initialized');
    } catch (error) {
      console.error('AdMob initialization failed:', error);
    }
  },

  showInterstitial: () => {
    if (!AdManager.initialized || !InterstitialAd) {
      console.log('AdMob not ready for interstitial');
      return;
    }

    const interstitial = InterstitialAd.createForAdRequest(adUnitIds.interstitial, {
      requestNonPersonalizedAdsOnly: true,
    });

    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show();
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    });

    interstitial.load();
  },

  showRewarded: (onReward) => {
    if (!AdManager.initialized || !RewardedAd) {
      console.log('AdMob not ready for rewarded ad, simulating reward');
      onReward();
      return;
    }

    const rewarded = RewardedAd.createForAdRequest(adUnitIds.rewarded, {
      requestNonPersonalizedAdsOnly: true,
    });

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });

    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      onReward();
    });

    const unsubscribeClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    });

    rewarded.load();
  },

  getBannerComponent: () => {
    if (!AdManager.initialized || !BannerAd) {
      return (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Ad Space</Text>
        </View>
      );
    }

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

const styles = StyleSheet.create({
  placeholder: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    color: '#999',
    fontSize: 12,
  },
});

export default AdManager;
