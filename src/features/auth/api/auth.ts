import {
  UserData,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from '../auth.types';
import { LS_KEY_API_TOKEN } from '~/api/const';
import { axiosInstance, axiosInstanceWithoutAuth } from '~/api/apiTransport';

export const login = async (payload: LoginPayload) => {
  const res = await axiosInstanceWithoutAuth.request<LoginResponse>({
    method: 'post',
    url: '/auth/login',
    data: payload,
  });

  localStorage.setItem(LS_KEY_API_TOKEN, res.data.token);
};

export const logout = async () => {
  const token = localStorage.getItem(LS_KEY_API_TOKEN) ?? '';
  localStorage.removeItem(LS_KEY_API_TOKEN);
  await axiosInstanceWithoutAuth.request({
    url: 'auth/logout',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchUserData = async () => {
  const res = await axiosInstance.request({
    url: 'auth/user',
  });

  return res.data;
};

export const register = async (payload: RegisterPayload) => {
  const res = await axiosInstanceWithoutAuth<UserData>({
    url: '/auth/register',
    method: 'post',
    data: payload,
  });

  return res.data;
};

export const authApi = { login, logout, fetchUserData, register } as const;
