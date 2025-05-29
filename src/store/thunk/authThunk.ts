import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi } from 'store/services/AuthApi';
import { ILoginInput } from 'store/states';

export const authLogin = createAsyncThunk(`globalSlice/authLogin`, async (loginData: ILoginInput) => {
  return await AuthApi.login(loginData);
});

export const authLogout = createAsyncThunk(`globalSlice/authLogout`, async () => {
  return await AuthApi.logout();
});

export const authProfile = createAsyncThunk(`globalSlice/authProfile`, async () => {
  return await AuthApi.profile();
});
