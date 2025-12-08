import analytics from '@react-native-firebase/analytics';

const AnalyticsManager = {
  initialized: false,

  initialize: async () => {
    try {
      await analytics().setAnalyticsCollectionEnabled(true);
      AnalyticsManager.initialized = true;
      console.log('Firebase Analytics initialized');
    } catch (error) {
      console.error('Firebase Analytics initialization failed:', error);
    }
  },

  setUserId: async (userId) => {
    if (!AnalyticsManager.initialized) return;
    try {
      await analytics().setUserId(userId);
      console.log(`Set user ID: ${userId}`);
    } catch (error) {
      console.error('Failed to set user ID:', error);
    }
  },

  logEvent: async (eventName, params) => {
    if (!AnalyticsManager.initialized) return;
    try {
      await analytics().logEvent(eventName, params);
      console.log(`Logged event: ${eventName}`);
    } catch (error) {
      console.error('Failed to log event:', error);
    }
  },

  setUserProperties: async (properties) => {
    if (!AnalyticsManager.initialized) return;
    try {
      await analytics().setUserProperties(properties);
      console.log('Set user properties');
    } catch (error) {
      console.error('Failed to set user properties:', error);
    }
  },
};

export default AnalyticsManager;
