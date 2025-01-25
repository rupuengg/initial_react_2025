import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGallery, IPhoto } from 'models';
import { IGlobalState, defaultGlobalState } from 'store/states';
import { getAllGallery, getAllPhotos, getGalleryPhotos } from 'store/thunk';

export const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: defaultGlobalState,
  reducers: {
    setAllPhotos(draft: IGlobalState, action: PayloadAction<IPhoto[]>) {
      draft.photos = action.payload;
    },
    setAllGallery(draft: IGlobalState, action: PayloadAction<IGallery[]>) {
      draft.galleries = action.payload;
    },
    setGalleryPhotos(draft: IGlobalState, action: PayloadAction<IGallery>) {
      draft.gallery = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IGlobalState>) => {
    builder
      .addCase(getAllPhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<IPhoto[]>) => {
        globalSlice.caseReducers.setAllPhotos(draft, action);
      })
      .addCase(getAllGallery.fulfilled, (draft: IGlobalState, action: PayloadAction<IGallery[]>) => {
        globalSlice.caseReducers.setAllGallery(draft, action);
      })
      .addCase(getGalleryPhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<IGallery>) => {
        globalSlice.caseReducers.setGalleryPhotos(draft, action);
      });
  },
});

export const GlobalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
