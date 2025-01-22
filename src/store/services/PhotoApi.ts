import { IPhoto } from 'models';
import { ApiPath } from 'store/constants';
import { imageKitAxiosInstance } from './axios';

export interface IPhotoApi {
  getAll(): Promise<IPhoto[]>;
  getByKey(key: string): Promise<IPhoto>;
  create(photo: IPhoto): Promise<IPhoto>;
  update(photo: IPhoto): Promise<IPhoto>;
  updateActivePage(photo: IPhoto): Promise<string>;
  clearActivePage(photo: IPhoto): Promise<string>;
  delete(key: string): Promise<string>;
}

export const PhotoApi: IPhotoApi = {
  getAll: async (): Promise<IPhoto[]> => {
    try {
      return (await imageKitAxiosInstance.get(`${ApiPath.PATH.ROUTE_PATH.PHOTO_PATH}`, { headers: { 'Content-Type': 'application/json' } })).data;
    } catch {
      return [];
    }
  },
  getByKey: async (key: string): Promise<IPhoto> => {
    try {
      return (await imageKitAxiosInstance.get(`${ApiPath.PATH.ROUTE_PATH.GALLERY_PATH}/${key}`, { headers: { 'Content-Type': 'application/json' } })).data;
    } catch {
      throw new Error('Error while converting');
    }
  },
  create: async (photo: IPhoto): Promise<IPhoto> => {
    try {
      return (
        await imageKitAxiosInstance.post(`${ApiPath.PATH.ROUTE_PATH.GALLERY_PATH}`, JSON.stringify(photo), {
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
    } catch {
      throw new Error('Error while converting');
    }
  },
  update: async (photo: IPhoto): Promise<IPhoto> => {
    try {
      return (
        await imageKitAxiosInstance.put(`${ApiPath.PATH.ROUTE_PATH.GALLERY_PATH}`, JSON.stringify(photo), {
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
    } catch {
      throw new Error('Error while converting');
    }
  },
  updateActivePage: async (photo: IPhoto): Promise<string> => {
    try {
      return (
        await imageKitAxiosInstance.put(ApiPath.PATH.ROUTE_PATH.GALLERY_PATH, JSON.stringify(photo), {
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
    } catch {
      throw new Error('Error while converting');
    }
  },
  clearActivePage: async (photo: IPhoto): Promise<string> => {
    try {
      return (
        await imageKitAxiosInstance.put(ApiPath.PATH.ROUTE_PATH.GALLERY_PATH, JSON.stringify(photo), {
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
    } catch {
      throw new Error('Error while converting');
    }
  },
  delete: async (key: string): Promise<string> => {
    try {
      return (await imageKitAxiosInstance.delete(`${ApiPath.PATH.ROUTE_PATH.GALLERY_PATH}/${key}`, { headers: { 'Content-Type': 'application/json' } })).data;
    } catch {
      throw new Error('Error while converting');
    }
  },
};
