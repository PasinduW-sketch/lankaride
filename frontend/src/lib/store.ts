import { configureStore } from '@reduxjs/toolkit';
import busReducer from './slices/busSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    bus: busReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
