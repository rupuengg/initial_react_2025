import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IGallery, INavigation, IPhoto } from 'entities';
import { E_Notification_Type } from 'enums';
import { IGlobalState, defaultGlobalState } from 'store/states';
import {
  getAllDonePhotos,
  getAllGallery,
  getAllPhotos,
  getAllUnderConstructionPhotos,
  getFeaturedGallery,
  getGalleryAllPhotos,
  getGalleryPhotos,
  getMainNavination,
  getSidebarNavination,
} from 'store/thunk';

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
    setEntryPoint(draft: IGlobalState, action: PayloadAction<{ entrypoint: string }>) {
      draft.entrypoint = action.payload.entrypoint;
    },
    submitContactForm(draft: IGlobalState) {
      draft.isContactFormSubmit = true;
    },
    resetContactForm(draft: IGlobalState) {
      draft.isContactFormSubmit = false;
    },
    onOpenMFE(draft: IGlobalState, action: PayloadAction<INavigation>) {
      const path = findPath(draft.sidebarNavigations, 'title', action.payload.entrypoint);

      draft.mfeTitle = action.payload.title;
      draft.mfeSupTitle = path.slice(0, -1);
      // draft.mainNavTitle = action.payload.mainNavTitle;
      draft.entrypoint = action.payload.entrypoint;
      draft.selectedNav = action.payload;
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
    setMainNavigation(draft: IGlobalState, action: PayloadAction<INavigation[]>) {
      draft.navigation = action.payload.filter(item => item.isParent === 1).map(item => ({ ...item, subMenus: item.items ? JSON.parse(item.items) : null }));
    },
    setSidebarNavigation(draft: IGlobalState, action: PayloadAction<INavigation[]>) {
      draft.sidebarNavigations = action.payload.filter(item => item.isParent === 1).map(item => ({ ...item, subMenus: item.items ? JSON.parse(item.items) : null }));
    },
    setGalleryAllPhotos(draft: IGlobalState, action: PayloadAction<{ galleryId: string; photos: IPhoto[] }>) {
      draft.projects = {
        ...draft.projects,
        [action.payload.galleryId]: {
          ...draft.projects[action.payload.galleryId],
          listAll: action.payload.photos,
        },
      };
    },
    setGalleryDonePhotos(draft: IGlobalState, action: PayloadAction<{ galleryId: string; photos: IPhoto[] }>) {
      draft.projects = {
        ...draft.projects,
        [action.payload.galleryId]: {
          ...draft.projects[action.payload.galleryId],
          listOfDone: action.payload.photos,
        },
      };
    },
    setGalleryUnderConstructionPhotos(draft: IGlobalState, action: PayloadAction<{ galleryId: string; photos: IPhoto[] }>) {
      draft.projects = {
        ...draft.projects,
        [action.payload.galleryId]: {
          ...draft.projects[action.payload.galleryId],
          listOfUnderConstruction: action.payload.photos,
        },
      };
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
      })
      .addCase(getMainNavination.fulfilled, (draft: IGlobalState, action: PayloadAction<INavigation[]>) => {
        globalSlice.caseReducers.setMainNavigation(draft, action);
      })
      .addCase(getSidebarNavination.fulfilled, (draft: IGlobalState, action: PayloadAction<INavigation[]>) => {
        globalSlice.caseReducers.setSidebarNavigation(draft, action);
      })
      .addCase(getGalleryAllPhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<{ galleryId: string; photos: IPhoto[] }>) => {
        globalSlice.caseReducers.setGalleryAllPhotos(draft, action);
      })
      .addCase(getAllDonePhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<{ galleryId: string; photos: IPhoto[] }>) => {
        globalSlice.caseReducers.setGalleryDonePhotos(draft, action);
      })
      .addCase(getAllUnderConstructionPhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<{ galleryId: string; photos: IPhoto[] }>) => {
        globalSlice.caseReducers.setGalleryUnderConstructionPhotos(draft, action);
      });
  },
});

export const GlobalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
