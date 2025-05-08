import { createAsyncThunk } from '@reduxjs/toolkit';
import { MenuApi } from 'store/services';

export const getSidebarNavination = createAsyncThunk(`globalSlice/getSidebarNavination`, async (endpoint: string) => {
  return await MenuApi.get(endpoint);
});
