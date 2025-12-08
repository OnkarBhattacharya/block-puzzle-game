import remoteConfig from '@react-native-firebase/remote-config';

const RemoteConfigManager = {
  initialize: async () => {
    try {
      await remoteConfig().setDefaults({
        interstitial_ad_frequency: 3,
      });
      await remoteConfig().fetchAndActivate();
      console.log('Firebase Remote Config initialized and activated');
    } catch (error) {
      console.error('Firebase Remote Config initialization failed:', error);
    }
  },

  fetchAndActivate: async () => {
    try {
      await remoteConfig().fetchAndActivate();
      console.log('Firebase Remote Config fetched and activated');
    } catch (error) {
      console.error('Firebase Remote Config fetch and activation failed:', error);
    }
  },

  getInterstitialAdFrequency: () => {
    return remoteConfig().getNumber('interstitial_ad_frequency');
  },
};

export default RemoteConfigManager;
