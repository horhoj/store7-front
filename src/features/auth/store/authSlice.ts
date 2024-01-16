import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IS {
  isAuth: boolean;
}

const SLICE_NAME = 'authSlice';

const initialState: IS = {
  isAuth: false,
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

interface LoginThunkPayload {
  successCb: () => void;
}

const loginThunk = createAsyncThunk(
  `${SLICE_NAME}/loginThunk`,
  async ({ successCb }: LoginThunkPayload, store) => {
    try {
      store.dispatch(actions.setIsAuth(true));
      successCb();
      return null;
    } catch (e: unknown) {
      return store.rejectWithValue((e as Error).message);
    }
  },
);

export const authSlice = { actions, reducer, thunks: { loginThunk } } as const;
