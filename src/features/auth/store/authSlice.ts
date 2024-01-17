import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginPayload } from '../api/auth.type';
import { authApi } from '../api/auth';
import {
  RequestList,
  RequestStateProperty,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from '~/store/helpers';

interface IS {
  isAuth: boolean;
  loginRequest: RequestStateProperty;
  fetchUserDataRequest: RequestStateProperty;
  logoutRequest: RequestStateProperty;
}

const SLICE_NAME = 'authSlice';

const initialState: IS = {
  isAuth: false,
  loginRequest: makeRequestStateProperty(),
  fetchUserDataRequest: makeRequestStateProperty({ isLoading: true }),
  logoutRequest: makeRequestStateProperty(),
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    clearUserData: (state) => {
      state.fetchUserDataRequest = makeRequestStateProperty();
    },
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      loginThunk,
      'loginRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      logoutThunk,
      'logoutRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchUserDataFirstAppRunThunk,
      'fetchUserDataRequest',
    );
  },
});

interface LoginThunkPayload {
  loginPayload: LoginPayload;
  successCb: () => void;
}

const loginThunk = createAsyncThunk(
  `${SLICE_NAME}/loginThunk`,
  async ({ successCb, loginPayload }: LoginThunkPayload, store) => {
    try {
      await authApi.login(loginPayload);
      store.dispatch(actions.setIsAuth(true));
      successCb();
      return null;
    } catch (e: unknown) {
      return store.rejectWithValue((e as Error).message);
    }
  },
);

const logoutThunk = createAsyncThunk(`${SLICE_NAME}`, async (_, store) => {
  try {
    store.dispatch(actions.setIsAuth(false));
    store.dispatch(actions.clearUserData());
    authApi.logout();

    return null;
  } catch (e: unknown) {
    return store.rejectWithValue((e as Error).message);
  }
});

const fetchUserDataFirstAppRunThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchUserDataThunk`,
  async (_, store) => {
    try {
      const res = await authApi.fetchUserData();
      store.dispatch(actions.setIsAuth(true));
      return store.fulfillWithValue(res);
    } catch (e: unknown) {
      store.dispatch(actions.setIsAuth(false));
      return store.rejectWithValue((e as Error).message);
    }
  },
);

export const authSlice = {
  actions,
  reducer,
  thunks: { loginThunk, logoutThunk, fetchUserDataFirstAppRunThunk },
} as const;
