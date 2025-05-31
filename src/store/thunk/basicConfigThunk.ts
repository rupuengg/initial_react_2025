import { createAsyncThunk } from '@reduxjs/toolkit';
import { BasicConfigApi } from 'store/services';

export const getBasicConfig = createAsyncThunk(`globalSlice/getBasicConfig`, async () => {
  return await BasicConfigApi.get();
});
