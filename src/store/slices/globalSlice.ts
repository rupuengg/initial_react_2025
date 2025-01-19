import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPhoto } from 'models';
import { IGlobalState } from 'store';
import { defaultGlobalState } from 'store';
import { getAllPhotos } from 'store';

export const GLOABL_SLICE = 'globalSlice';

export const globalSlice = createSlice({
  name: GLOABL_SLICE,
  initialState: defaultGlobalState,
  reducers: {
    setAllPhotos(draft: IGlobalState, action: PayloadAction<IPhoto[]>) {
      draft.photos = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IGlobalState>) => {
    builder.addCase(getAllPhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<IPhoto[]>) => {
      globalSlice.caseReducers.setAllPhotos(draft, action);
    });
  },
});

export const GlobalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
