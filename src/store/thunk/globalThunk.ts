import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalApi } from 'store/services';

export const getTestimonial = createAsyncThunk(`globalSlice/getTestimonial`, async () => {
  return await GlobalApi.getTestimonial();
});

export const getOffers = createAsyncThunk(`globalSlice/getOffers`, async () => {
  return await GlobalApi.getOffers();
});

export const getJsonAllGallery = createAsyncThunk(`globalSlice/getJsonAllGallery`, async () => {
  return await GlobalApi.getJsonAllGallery();
});

export const getJsonAllPhotos = createAsyncThunk(`globalSlice/getJsonAllPhotos`, async () => {
  return await GlobalApi.getJsonAllPhotos();
});
