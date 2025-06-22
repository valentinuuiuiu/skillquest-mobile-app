// Configuration for the mobile app
export const APP_CONFIG = {
  // API Configuration
  API_BASE_URL: __DEV__ ? 'http://localhost:3001' : 'https://api.skillquest.app',
  
  // Development settings
  USE_MOCK_DATA: false, // Set to true to use mock data instead of API calls
  DEBUG_MODE: __DEV__,
  
  // App settings
  APP_NAME: 'SkillQuest',
  APP_VERSION: '1.0.0',
  
  // Authentication
  JWT_STORAGE_KEY: '@skillquest:jwt_token',
  USER_STORAGE_KEY: '@skillquest:user_data',
  
  // Gamification
  XP_PER_LESSON: 10,
  XP_PER_QUIZ: 20,
  XP_PER_ACHIEVEMENT: 50,
  
  // Features
  FEATURES: {
    PUSH_NOTIFICATIONS: true,
    OFFLINE_MODE: false,
    SOCIAL_FEATURES: true,
    PREMIUM_CONTENT: true,
  },
};

// Mock data for development
export const MOCK_USER = {
  id: '1',
  email: 'test@example.com',
  username: 'TestUser',
  subscription: 'free' as const,
  createdAt: new Date().toISOString(),
};

export const MOCK_AUTH_DATA = {
  user: MOCK_USER,
  token: 'mock-jwt-token',
  refreshToken: 'mock-refresh-token',
};

export default APP_CONFIG;
