import { useEffect } from 'react';
import { authSlice } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export const useAuthFetchUserData = () => {
  const dispatch = useAppDispatch();
  const fetchUserDataRequest = useAppSelector(
    (state) => state.auth.fetchUserDataRequest,
  );

  useEffect(() => {
    dispatch(authSlice.thunks.fetchUserDataFirstAppRunThunk());
  }, []);

  return {
    isLoading: fetchUserDataRequest.isLoading,
  };
};
