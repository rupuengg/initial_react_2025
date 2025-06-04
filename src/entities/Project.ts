import { IAddress } from './Address';

export interface IProject {
  id?: number;
  title: string;
  addressId?: number;
  startDate?: string;
  endDate?: string;
  imageKitGalleryName?: string;
  address?: IAddress;
}
