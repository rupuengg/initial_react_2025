import { createAsyncThunk } from '@reduxjs/toolkit';
import { IContactInfoEntity } from 'entities';
import { QueryApi } from 'store';

export const raiseQuery = createAsyncThunk(`globalSlice/raiseQuery`, async (contact: IContactInfoEntity) => {
  return await QueryApi.raise(contact);
});
