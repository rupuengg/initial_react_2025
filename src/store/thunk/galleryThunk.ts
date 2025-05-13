/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GalleryApi, PhotoApi } from 'store/services';

export const getAllGallery = createAsyncThunk(`globalSlice/getAllGallery`, async (_: void, _thunkAPI) => {
  return await GalleryApi.getAllGallery();
});

export const getGalleryPhotos = createAsyncThunk(`globalSlice/getGalleryPhotos`, async (galleryName: string, _thunkAPI) => {
  return await PhotoApi.getByKey(galleryName);
});

export const getFeaturedGallery = createAsyncThunk(`globalSlice/getFeaturedGallery`, async (_: void, _thunkAPI) => {
  return await PhotoApi.getFeaturedGallery();
});

export const getGalleryAllPhotos = createAsyncThunk(`globalSlice/getGalleryAllPhotos`, async ({ galleryId, imageKitFolder }: { galleryId: string; imageKitFolder: string }) => {
  const photos = await GalleryApi.getAllPhotos(imageKitFolder);
  return { galleryId, photos };
});

export const getAllDonePhotos = createAsyncThunk(`globalSlice/getAllDonePhotos`, async ({ galleryId, imageKitFolder }: { galleryId: string; imageKitFolder: string }) => {
  const photos = await GalleryApi.getAllDonePhotos(imageKitFolder);
  return { galleryId, photos };
});

export const getAllUnderConstructionPhotos = createAsyncThunk(`globalSlice/getAllUnderConstructionPhotos`, async ({ galleryId, imageKitFolder }: { galleryId: string; imageKitFolder: string }) => {
  const photos = await GalleryApi.getAllUnderConstructionPhotos(imageKitFolder);
  return { galleryId, photos };
});
