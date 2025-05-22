import { createAsyncThunk } from '@reduxjs/toolkit';
import { BlogApi } from 'store/services/BlogApi';

export const getBlogList = createAsyncThunk(`globalSlice/getBlogList`, async (endpoint: string) => {
  return await BlogApi.get(endpoint);
});
