import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserData, LoginPayload, RegisterPayload } from '../auth.types';
import { authApi } from '../api/auth';
import {
  RequestList,
  RequestStateProperty,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from '~/store/helpers';
import { getApiErrors } from '~/api/common';
import { ApiError } from '~/api/common.types';

interface IS {
  isAuth: boolean;
  userData: UserData | null;
  loginRequest: RequestStateProperty<unknown, ApiError>;
  fetchUserDataRequest: RequestStateProperty<unknown, ApiError>;
  logoutRequest: RequestStateProperty<unknown, ApiError>;
  registrationRequest: RequestStateProperty<unknown, ApiError>;
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

    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
    },

    loginRequestClear: (state) => {
      state.loginRequest = makeRequestStateProperty();
    },

    registrationRequestClear: (state) => {
      state.registrationRequest = makeRequestStateProperty();
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
}

const loginThunk = createAsyncThunk(
  `${SLICE_NAME}/loginThunk`,
  async (payload: LoginThunkPayload, store) => {
    try {
      await authApi.login(payload.loginPayload);
      const userDataRes = await authApi.fetchUserData();
      store.dispatch(actions.setUserData(userDataRes));
      store.dispatch(actions.setIsAuth(true));
      return null;
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
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
    return store.rejectWithValue(getApiErrors(e));
  }
});

const fetchUserDataFirstAppRunThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchUserDataThunk`,
  async (_, store) => {
    try {
      const res = await authApi.fetchUserData();
      store.dispatch(actions.setUserData(res));
      store.dispatch(actions.setIsAuth(true));
      return store.fulfillWithValue(null);
    } catch (e: unknown) {
      store.dispatch(actions.setIsAuth(false));
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

interface RegisterThunkPayload {
  registerPayload: RegisterPayload;
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
      const userDataRes = await authApi.fetchUserData();
      store.dispatch(actions.setUserData(userDataRes));
      store.dispatch(actions.setIsAuth(true));
      return store.fulfillWithValue(null);
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

export const authReducer = reducer;
export const authSlice = {
  actions,
  thunks: {
    loginThunk,
    logoutThunk,
    fetchUserDataFirstAppRunThunk,
    registerThunk,
  },
} as const;
