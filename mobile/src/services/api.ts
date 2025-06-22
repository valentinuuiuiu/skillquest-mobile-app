import APP_CONFIG from '../config/app';

// API Configuration
const API_BASE_URL = APP_CONFIG.API_BASE_URL;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/api/users/profile`,
    UPDATE: `${API_BASE_URL}/api/users/update`,
  },
  COURSES: {
    LIST: `${API_BASE_URL}/api/courses`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/courses/${id}`,
  },
  PROGRESS: {
    GET: `${API_BASE_URL}/api/progress`,
    UPDATE: `${API_BASE_URL}/api/progress/update`,
  },
  GAMIFICATION: {
    LEADERBOARD: `${API_BASE_URL}/api/gamification/leaderboard`,
    ACHIEVEMENTS: `${API_BASE_URL}/api/gamification/achievements`,
  },
};

// Helper function to make API calls
export const apiCall = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export default API_ENDPOINTS;
