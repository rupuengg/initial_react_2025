import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGallery, INavigation, IPhoto } from 'models';
import { E_Notification_Type } from 'enums';
import { IGlobalState, defaultGlobalState } from 'store/states';
import { getAllGallery, getAllPhotos, getFeaturedGallery, getGalleryPhotos } from 'store/thunk';

const findPath = (ob: any, key: any, value: any) => {
  const path: any = [];
  const keyExists: any = (obj: any) => {
    if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
      return false;
      // eslint-disable-next-line no-prototype-builtins
    } else if (obj.hasOwnProperty(key) && obj[key] === value) {
      return true;
    } else if (Array.isArray(obj)) {
      path.pop();
      for (let i = 0; i < obj.length; i++) {
        const result = keyExists(obj[i], key);
        if (result) {
          path.push(obj[i][key]);
          return result;
        }
        path.pop();
      }
    } else {
      for (const k in obj) {
        path.push(k);
        const result = keyExists(obj[k], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    }
    return false;
  };
  keyExists(ob);
  let myPath: any = [];
  myPath = path?.reverse();
  return myPath;
};

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
    setFeaturedGallery(draft: IGlobalState, action: PayloadAction<IGallery>) {
      draft.featureGallery = action.payload;
    },
    setEntryPoint(draft: IGlobalState, action: PayloadAction<{ path: string; entrypoint: string; sectionId: string | null }>) {
      draft.path = action.payload.path;
      draft.entrypoint = action.payload.entrypoint;
      draft.sectionId = action.payload.sectionId;
    },
    onOpenMFE(draft: IGlobalState, action: PayloadAction<INavigation>) {
      const path = findPath(draft.sidebarNavigations, 'title', action.payload.entrypoint);

      draft.mfeTitle = action.payload.title;
      draft.mfeSupTitle = path.slice(0, -1);
      // draft.mainNavTitle = action.payload.mainNavTitle;
      draft.sectionId = action.payload.sectionId;
      draft.entrypoint = action.payload.entrypoint;
      draft.path = action.payload.path;
    },
    showNotification(draft: IGlobalState, action: PayloadAction<{ notificationType: E_Notification_Type; notificationMessage: string }>) {
      draft.notification.isActiveScreen = false;
      draft.notification.isShowNotification = true;
      draft.notification.notificationType = action.payload.notificationType;
      draft.notification.notificationMessage = action.payload.notificationMessage;
    },
    clearNotification(draft: IGlobalState) {
      draft.notification.isActiveScreen = false;
      draft.notification.isShowNotification = false;
      draft.notification.notificationType = E_Notification_Type.ALERT;
      draft.notification.notificationMessage = '';
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
      })
      .addCase(getFeaturedGallery.fulfilled, (draft: IGlobalState, action: PayloadAction<IGallery>) => {
        globalSlice.caseReducers.setFeaturedGallery(draft, action);
      });
  },
});

export const GlobalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
