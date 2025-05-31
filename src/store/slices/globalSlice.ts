import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBasicConfigEntity, IBlogEntity, IGallery, INavigation, IOffer, IPhoto, ITestimonialEntity, IUser } from 'entities';
import { IMenuGroupEntity } from 'entities';
import { E_Menu_Type, E_Notification_Type } from 'enums';
import { SessionUtils } from 'utils';
import { tokenReference } from 'store/services/axios';
import { IGlobalState, IUserToken, defaultGlobalState } from 'store/states';
import {
  getAllDonePhotos,
  getAllGallery,
  getAllPhotos,
  getAllUnderConstructionPhotos,
  getBasicConfig,
  getBlogList,
  getFeaturedGallery,
  getGalleryAllPhotos,
  getGalleryPhotos,
  getJsonAllGallery,
  getJsonAllPhotos,
  getMenuGroup,
  getOffers,
  getTestimonial,
} from 'store/thunk';
import { authLogin, authLogout, authProfile } from 'store/thunk/authThunk';

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
    setTestimonial(draft: IGlobalState, action: PayloadAction<ITestimonialEntity[]>) {
      draft.testimonial = action.payload;
    },
    setOffers(draft: IGlobalState, action: PayloadAction<IOffer[]>) {
      draft.offers = action.payload;
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
    setMenugroup(draft: IGlobalState, action: PayloadAction<{ menuGroupType: E_Menu_Type; result: IMenuGroupEntity }>) {
      const cb = (group: IMenuGroupEntity) => {
        const menus = group.menus || [];
        const newGroup: IMenuGroupEntity = {
          ...group,
          menus: [...menus.filter(item => item.isParent === 1).map(item => ({ ...item, subMenus: item.items ? JSON.parse(item.items) : null }))],
        };
        return newGroup;
      };

      if (action.payload.menuGroupType === E_Menu_Type.MAIN_MENU) draft.mainMenuGroup = cb(action.payload.result);
      if (action.payload.menuGroupType === E_Menu_Type.ADMIN_MENU) draft.adminMenuGroup = cb(action.payload.result);
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
    setBlogs(draft: IGlobalState, action: PayloadAction<IBlogEntity[]>) {
      draft.blogs = action.payload;
    },
    setAuthLogin(draft: IGlobalState, action: PayloadAction<IUserToken>) {
      if (action.payload.token) {
        SessionUtils().saveToken(action.payload);
        tokenReference.token = action.payload.token;
      }
      if (action.payload.user) draft.authProfile = action.payload.user;
      if (action.payload.error) draft.loginError = action.payload.error;
    },
    setAuthLoginError(draft: IGlobalState, action: PayloadAction<IUserToken>) {
      draft.loginError = action.payload.error;
    },
    setClearLoginError(draft: IGlobalState) {
      draft.loginError = undefined;
    },
    setAuthLogout(draft: IGlobalState) {
      SessionUtils().clearToken();
      draft.authProfile = undefined;
      draft.loginError = undefined;
      tokenReference.token = undefined;
    },
    setAuthProfile(draft: IGlobalState, action: PayloadAction<IUser>) {
      draft.authProfile = action.payload;
    },
    setBasicConfig(draft: IGlobalState, action: PayloadAction<IBasicConfigEntity>) {
      draft.basicConfig = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IGlobalState>) => {
    builder
      .addCase(getAllPhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<IPhoto[]>) => {
        globalSlice.caseReducers.setAllPhotos(draft, action);
      })
      .addCase(getJsonAllPhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<IPhoto[]>) => {
        globalSlice.caseReducers.setAllPhotos(draft, action);
      })
      .addCase(getAllGallery.fulfilled, (draft: IGlobalState, action: PayloadAction<IGallery[]>) => {
        globalSlice.caseReducers.setAllGallery(draft, action);
      })
      .addCase(getJsonAllGallery.fulfilled, (draft: IGlobalState, action: PayloadAction<IGallery[]>) => {
        globalSlice.caseReducers.setAllGallery(draft, action);
      })
      .addCase(getGalleryPhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<IGallery>) => {
        globalSlice.caseReducers.setGalleryPhotos(draft, action);
      })
      .addCase(getFeaturedGallery.fulfilled, (draft: IGlobalState, action: PayloadAction<IGallery>) => {
        globalSlice.caseReducers.setFeaturedGallery(draft, action);
      })
      .addCase(getMenuGroup.fulfilled, (draft: IGlobalState, action: PayloadAction<{ menuGroupType: E_Menu_Type; result: IMenuGroupEntity }>) => {
        globalSlice.caseReducers.setMenugroup(draft, action);
      })
      .addCase(getGalleryAllPhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<{ galleryId: string; photos: IPhoto[] }>) => {
        globalSlice.caseReducers.setGalleryAllPhotos(draft, action);
      })
      .addCase(getAllDonePhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<{ galleryId: string; photos: IPhoto[] }>) => {
        globalSlice.caseReducers.setGalleryDonePhotos(draft, action);
      })
      .addCase(getAllUnderConstructionPhotos.fulfilled, (draft: IGlobalState, action: PayloadAction<{ galleryId: string; photos: IPhoto[] }>) => {
        globalSlice.caseReducers.setGalleryUnderConstructionPhotos(draft, action);
      })
      .addCase(getBlogList.fulfilled, (draft: IGlobalState, action: PayloadAction<IBlogEntity[]>) => {
        globalSlice.caseReducers.setBlogs(draft, action);
      })
      .addCase(getTestimonial.fulfilled, (draft: IGlobalState, action: PayloadAction<ITestimonialEntity[]>) => {
        globalSlice.caseReducers.setTestimonial(draft, action);
      })
      .addCase(getOffers.fulfilled, (draft: IGlobalState, action: PayloadAction<IOffer[]>) => {
        globalSlice.caseReducers.setOffers(draft, action);
      })
      .addCase(authLogin.fulfilled, (draft: IGlobalState, action: PayloadAction<IUserToken>) => {
        globalSlice.caseReducers.setAuthLogin(draft, action);
      })
      .addCase(authLogout.fulfilled, (draft: IGlobalState) => {
        globalSlice.caseReducers.setAuthLogout(draft);
      })
      .addCase(authProfile.fulfilled, (draft: IGlobalState, action: PayloadAction<IUser>) => {
        globalSlice.caseReducers.setAuthProfile(draft, action);
      })
      .addCase(getBasicConfig.fulfilled, (draft: IGlobalState, action: PayloadAction<IBasicConfigEntity>) => {
        globalSlice.caseReducers.setBasicConfig(draft, action);
      });
  },
});

export const GlobalActions = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
