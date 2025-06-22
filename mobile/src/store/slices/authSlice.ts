import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_ENDPOINTS, apiCall } from '../../services/api';
import APP_CONFIG, { MOCK_AUTH_DATA } from '../../config/app';

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  subscription: 'free' | 'explorer' | 'professional' | 'enterprise';
  createdAt: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// Async thunks for API calls
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Use mock data in development if configured or if API is not available
      if (APP_CONFIG.USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check mock credentials
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          return MOCK_AUTH_DATA;
        } else {
          throw new Error('Invalid credentials');
        }
      }
      
      // Try real API call
      try {
        const data = await apiCall(API_ENDPOINTS.AUTH.LOGIN, {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
        return data.data; // Extract the data part from the response
      } catch (apiError) {
        // Fallback to mock data if API fails in development
        if (APP_CONFIG.DEBUG_MODE) {
          console.warn('API call failed, using mock data:', apiError);
          if (credentials.email === 'test@example.com' && credentials.password === 'password') {
            return MOCK_AUTH_DATA;
          }
        }
        throw apiError;
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      // Use mock data in development if configured
      if (APP_CONFIG.USE_MOCK_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          user: {
            id: '2',
            email: credentials.email,
            username: credentials.username,
            subscription: 'free' as const,
            createdAt: new Date().toISOString(),
          },
          token: 'mock-jwt-token',
          refreshToken: 'mock-refresh-token',
        };
      }
      
      // Try real API call
      try {
        const data = await apiCall(API_ENDPOINTS.AUTH.REGISTER, {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
        return data.data; // Extract the data part from the response
      } catch (apiError) {
        // Fallback to mock data if API fails in development
        if (APP_CONFIG.DEBUG_MODE) {
          console.warn('API call failed, using mock data:', apiError);
          return {
            user: {
              id: '2',
              email: credentials.email,
              username: credentials.username,
              subscription: 'free' as const,
              createdAt: new Date().toISOString(),
            },
            token: 'mock-jwt-token',
            refreshToken: 'mock-refresh-token',
          };
        }
        throw apiError;
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
