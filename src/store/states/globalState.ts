import banner1 from 'assets/images/banner/banner1.jpg';
import banner2 from 'assets/images/banner/banner2.jpg';
import banner3 from 'assets/images/banner/banner3.jpg';
import banner4 from 'assets/images/banner/banner4.jpg';
import banner5 from 'assets/images/banner/banner5.jpg';
import navData from 'json/navigation.json';
import offerData from 'json/offers.json';
import { IBanner, INavigation, IPhoto } from 'models';
import { IOffer } from 'models/Offer';

const banners = [
  {
    img: banner1
  },
  {
    img: banner2
  },
  {
    img: banner3
  },
  {
    img: banner4
  },
  {
    img: banner5
  }
];

export enum E_Data_Load_Status {
  NOT_YET_STARTED = 'notyetstarted',
  FULFULLED = 'fulfilled',
  PENDING = 'pending',
  REJECTED = 'rejected'
}

export interface IDataStatus {
  loadAllPhotos?: E_Data_Load_Status;
}

export const EMPTY_DATA_STATUS_ENTITY: IDataStatus = {
  loadAllPhotos: E_Data_Load_Status.NOT_YET_STARTED
};

export interface IGlobalState {
  photos: IPhoto[];
  banners: IBanner[];
  navigation: INavigation[];
  offers: IOffer[];
}

export const defaultGlobalState: IGlobalState = {
  photos: [],
  banners,
  navigation: navData,
  offers: offerData
};
