import banner1 from '../../assets/images/banner/banner1.jpg';
import banner2 from '../../assets/images/banner/banner2.jpg';
import banner3 from '../../assets/images/banner/banner3.jpg';
import banner4 from '../../assets/images/banner/banner4.jpg';
import banner5 from '../../assets/images/banner/banner5.jpg';
import { IBanner, IBlogEntity, IGallery, INavigation, IOffer, IPhoto, ITestimonialEntity } from 'entities';
import { IMenuGroupEntity } from 'entities';
import { E_Notification_Type } from 'enums';

const banners = [
  {
    img: banner1,
    txt: 'our work living room',
  },
  {
    img: banner2,
    txt: 'our work living room',
  },
  {
    img: banner3,
    txt: 'our work living room',
  },
  {
    img: banner4,
    txt: 'our work living room',
  },
  {
    img: banner5,
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
  isContactFormSubmit?: boolean;

  projects: {
    [x: string]: IProject;
  };

  selectedNav?: INavigation;

  entrypoint?: string;
  mfeTitle?: string;
  mfeSupTitle?: any[];
  mainNavTitle?: string[];
  notification: INotificationState;
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
