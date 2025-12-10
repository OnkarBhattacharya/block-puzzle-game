import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Logger } from '../utils/logger';
import { getAdUnitIds } from '../config/env';

let BannerAd, BannerAdSize, InterstitialAd, RewardedAd, AdEventType, RewardedAdEventType, GoogleMobileAds;

if (Platform.OS !== 'web') {
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
    Logger.warn('AdManager', 'AdMob SDK not available', e.message);
  }
}

const adUnitIds = getAdUnitIds();

const AdManager = {
  initialized: false,

  initialize: async () => {
    if (!GoogleMobileAds) {
      Logger.warn('AdManager', 'AdMob SDK not available');
      return;
    }
    
    try {
      await GoogleMobileAds().initialize();
      AdManager.initialized = true;
      Logger.info('AdManager', 'AdMob initialized');
    } catch (error) {
      Logger.error('AdManager', 'AdMob initialization failed', error);
    }
  },

  showInterstitial: () => {
    if (!AdManager.initialized || !InterstitialAd) {
      Logger.warn('AdManager', 'AdMob not ready for interstitial');
      return;
    }

    let unsubscribeLoaded, unsubscribeClosed;
    
    try {
      const interstitial = InterstitialAd.createForAdRequest(adUnitIds.interstitial, {
        requestNonPersonalizedAdsOnly: true,
      });

      unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        interstitial.show();
      });

      unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        unsubscribeLoaded?.();
        unsubscribeClosed?.();
      });

      interstitial.load();
    } catch (error) {
      Logger.error('AdManager', 'Interstitial ad error', error);
      unsubscribeLoaded?.();
      unsubscribeClosed?.();
    }
  },

  showRewarded: (onReward) => {
    if (!AdManager.initialized || !RewardedAd) {
      Logger.warn('AdManager', 'AdMob not ready for rewarded ad, simulating reward');
      onReward();
      return;
    }

    let unsubscribeLoaded, unsubscribeEarned, unsubscribeClosed;
    
    try {
      const rewarded = RewardedAd.createForAdRequest(adUnitIds.rewarded, {
        requestNonPersonalizedAdsOnly: true,
      });

      unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        rewarded.show();
      });

      unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
        onReward();
      });

      unsubscribeClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
        unsubscribeLoaded?.();
        unsubscribeEarned?.();
        unsubscribeClosed?.();
      });

      rewarded.load();
    } catch (error) {
      Logger.error('AdManager', 'Rewarded ad error', error);
      unsubscribeLoaded?.();
      unsubscribeEarned?.();
      unsubscribeClosed?.();
    }
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