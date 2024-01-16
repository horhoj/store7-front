import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '~/features/auth/store/authSlice';

export const store = configureStore({
  devTools: true,
  reducer: {
    auth: authSlice.reducer,
  },
});
