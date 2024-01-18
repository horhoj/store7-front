import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginPayload, RegisterPayload } from '../api/auth.type';
import { authApi } from '../api/auth';
import {
  RequestList,
  RequestStateProperty,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from '~/store/helpers';

interface IS {
  isAuth: boolean;
  userData: unknown | null;
  loginRequest: RequestStateProperty;
  fetchUserDataRequest: RequestStateProperty;
  logoutRequest: RequestStateProperty;
  registrationRequest: RequestStateProperty;
}

const SLICE_NAME = 'authSlice';

const initialState: IS = {
  isAuth: false,
  loginRequest: makeRequestStateProperty(),
  userData: null,
  fetchUserDataRequest: makeRequestStateProperty({ isLoading: true }),
  logoutRequest: makeRequestStateProperty(),
  registrationRequest: makeRequestStateProperty(),
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    setUserData: (state, action: PayloadAction<unknown | null>) => {
      state.userData = action.payload;
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
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      registerThunk,
      'registrationRequest',
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
    store.dispatch(actions.setUserData(null));
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
      store.dispatch(actions.setUserData(res));
      return store.fulfillWithValue(null);
    } catch (e: unknown) {
      store.dispatch(actions.setIsAuth(false));
      return store.rejectWithValue((e as Error).message);
    }
  },
);

interface RegisterThunkPayload {
  registerPayload: RegisterPayload;
  successCb: () => void;
}

const registerThunk = createAsyncThunk(
  `${SLICE_NAME}/registerThunk`,
  async (payload: RegisterThunkPayload, store) => {
    try {
      await authApi.register(payload.registerPayload);
      await authApi.login({
        email: payload.registerPayload.email,
        password: payload.registerPayload.password,
      });
      store.dispatch(actions.setIsAuth(true));
      const userDataRes = await authApi.fetchUserData();
      store.dispatch(actions.setUserData(userDataRes));
      payload.successCb();
      return store.fulfillWithValue(null);
    } catch (e: unknown) {
      return store.rejectWithValue((e as Error).message);
    }
  },
);

export const authSlice = {
  actions,
  reducer,
  thunks: {
    loginThunk,
    logoutThunk,
    fetchUserDataFirstAppRunThunk,
    registerThunk,
  },
} as const;
