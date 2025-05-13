import { createAsyncThunk } from '@reduxjs/toolkit';
import { PhotoApi } from 'store/services';

export const getAllPhotos = createAsyncThunk(`globalSlice/getAllPhotos`, async () => {
  return await PhotoApi.getAll();
});
