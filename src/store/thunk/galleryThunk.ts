/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PhotoApi } from 'store/services';

export const getAllGallery = createAsyncThunk(`globalSlice/getAllGallery`, async (_: void, _thunkAPI) => {
  return await PhotoApi.getAllGallery();
});

export const getGalleryPhotos = createAsyncThunk(`globalSlice/getGalleryPhotos`, async (galleryName: string, _thunkAPI) => {
  return await PhotoApi.getByKey(galleryName);
});

export const getFeaturedGallery = createAsyncThunk(`globalSlice/getFeaturedGallery`, async (_: void, _thunkAPI) => {
  return await PhotoApi.getFeaturedGallery();
});
