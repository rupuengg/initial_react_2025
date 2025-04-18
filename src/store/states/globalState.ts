import banner1 from '../../assets/images/banner/banner1.jpg';
import banner2 from '../../assets/images/banner/banner2.jpg';
import banner3 from '../../assets/images/banner/banner3.jpg';
import banner4 from '../../assets/images/banner/banner4.jpg';
import banner5 from '../../assets/images/banner/banner5.jpg';
// import galleries from 'json/galleries.json';
import offerData from 'json/offers.json';
import photos from 'json/photos.json';
import { defaultNavigation, defaultSideBarNavigation } from 'mock';
import { IBanner, IGallery, INavigation, IPhoto } from 'models';
import { IOffer } from 'models/Offer';
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

export interface IGlobalState {
  photos: IPhoto[];
  galleries: IGallery[];
  gallery?: IGallery;
  featureGallery?: IGallery;
  banners: IBanner[];
  navigation: INavigation[];
  sidebarNavigations: INavigation[];
  offers: IOffer[];

  entrypoint?: string;
  path?: string;
  sectionId?: string | null;
  mfeTitle?: string;
  mfeSupTitle?: any[];
  mainNavTitle?: string[];
  notification: INotificationState;
}

export const defaultGlobalState: IGlobalState = {
  photos: photos,
  galleries: [],
  banners,
  navigation: defaultNavigation,
  sidebarNavigations: defaultSideBarNavigation,
  offers: offerData,

  entrypoint: '',
  path: '',
  mfeTitle: '',
  mfeSupTitle: [],
  mainNavTitle: [],
  notification: defaultNotificationState,
};
