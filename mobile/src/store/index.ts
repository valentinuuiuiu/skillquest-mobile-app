import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import coursesSlice from './slices/coursesSlice';
import gamificationSlice from './slices/gamificationSlice';
import progressSlice from './slices/progressSlice';
import learningSlice from './slices/learningSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user', 'gamification'], // Only persist these reducers
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  courses: coursesSlice,
  gamification: gamificationSlice,
  progress: progressSlice,
  learning: learningSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
