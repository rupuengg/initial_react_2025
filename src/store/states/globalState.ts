import { IBanner, IBasicConfigEntity, IBlogEntity, IGallery, INavigation, IOffer, IPhoto, ITestimonialEntity, IUser } from 'entities';
import { IMenuGroupEntity } from 'entities';
import { E_Notification_Type } from 'enums';

const banners = [
  {
    img: 'banner1.jpg',
    txt: 'our work living room',
  },
  {
    img: 'banner2.jpg',
    txt: 'our work living room',
  },
  {
    img: 'banner3.jpg',
    txt: 'our work living room',
  },
  {
    img: 'banner4.jpg',
    txt: 'our work living room',
  },
  {
    img: 'banner5.jpg',
    txt: 'our work living room',
  },
];

export enum E_Data_Load_Status {
  NOT_YET_STARTED = 'notyetstarted',
  FULFULLED = 'fulfilled',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export interface IDataStatus {
  loadAllPhotos?: E_Data_Load_Status;
  loadAllGalleries?: E_Data_Load_Status;
  loadFeaturedGallery?: E_Data_Load_Status;
}

export const EMPTY_DATA_STATUS_ENTITY: IDataStatus = {
  loadAllPhotos: E_Data_Load_Status.NOT_YET_STARTED,
  loadAllGalleries: E_Data_Load_Status.NOT_YET_STARTED,
  loadFeaturedGallery: E_Data_Load_Status.NOT_YET_STARTED,
};

export interface INotificationState {
  isShowNotification: boolean;
  notificationType: E_Notification_Type;
  notificationMessage: string;
  isActiveScreen: boolean;
}

export const defaultNotificationState: INotificationState = {
  isShowNotification: false,
  notificationType: E_Notification_Type.SUCCESS,
  notificationMessage: '',
  isActiveScreen: false,
};

export interface IProject {
  listAll: IPhoto[];
  listOfDone: IPhoto[];
  listOfUnderConstruction: IPhoto[];
}

export interface ILoginInput {
  username: string;
  password: string;
}

export interface IUserToken {
  token?: string;
  user?: IUser;
  error?: string;
}

export interface IGlobalState {
  photos: IPhoto[];
  galleries: IGallery[];
  gallery?: IGallery;
  featureGallery?: IGallery;
  banners: IBanner[];
  blogs?: IBlogEntity[];
  mainMenuGroup?: IMenuGroupEntity;
  adminMenuGroup?: IMenuGroupEntity;
  navigation: INavigation[];
  sidebarNavigations: INavigation[];
  offers: IOffer[];
  testimonial: ITestimonialEntity[];

  projects: {
    [x: string]: IProject;
  };

  selectedNav?: INavigation;

  entrypoint?: string;
  mfeTitle?: string;
  mfeSupTitle?: any[];
  mainNavTitle?: string[];
  notification: INotificationState;

  authProfile?: IUser;
  loginError?: string;

  basicConfig?: IBasicConfigEntity;
}

export const defaultGlobalState: IGlobalState = {
  photos: [],
  galleries: [],
  banners,
  navigation: [],
  sidebarNavigations: [],
  offers: [],
  testimonial: [],

  projects: {},

  entrypoint: '',
  mfeTitle: '',
  mfeSupTitle: [],
  mainNavTitle: [],
  notification: defaultNotificationState,
};
