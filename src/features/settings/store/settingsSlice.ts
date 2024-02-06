import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'settingsSlice';

interface IS {
  isDarkTheme: boolean;
}

const initialState: IS = {
  isDarkTheme: false,
};

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    themeToggle: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const settingsReducer = reducer;
export const settingsSlice = { actions, thunks: {} } as const;
