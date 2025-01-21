/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PhotoApi } from 'store/services';

export const getAllPhotos = createAsyncThunk(`globalSlice/getAllPhotos`, async (_: void, _thunkAPI) => {
  return await PhotoApi.getAll();
});
