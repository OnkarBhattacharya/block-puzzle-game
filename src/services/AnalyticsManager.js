const AnalyticsManager = {
  initialized: false,

  initialize: async () => {
    AnalyticsManager.initialized = true;
    console.log('Analytics stub initialized');
  },

  setUserId: async (userId) => {
    console.log(`Set user ID: ${userId}`);
  },

  logEvent: async (eventName, params) => {
    console.log(`Logged event: ${eventName}`, params);
  },

  setUserProperties: async (properties) => {
    console.log('Set user properties', properties);
  },
};

export default AnalyticsManager;
