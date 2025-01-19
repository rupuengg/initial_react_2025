import { ApiPath } from 'store';
import { imageKitAxiosInstance } from './axios';
import { IPhoto } from 'models';

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
      return (await imageKitAxiosInstance.get(`${ApiPath.PATH.LIVE_USER}`, { headers: { 'Content-Type': 'application/json' } })).data;
    } catch (error) {
      return [];
    }
  },
  getByKey: async (key: string): Promise<IPhoto> => {
    try {
      return (await imageKitAxiosInstance.get(`${ApiPath.PATH.LIVE_USER}/${key}`, { headers: { 'Content-Type': 'application/json' } })).data;
    } catch (error) {
      throw new Error('Error while converting');
    }
  },
  create: async (photo: IPhoto): Promise<IPhoto> => {
    try {
      return (
        await imageKitAxiosInstance.post(`${ApiPath.PATH.LIVE_USER}`, JSON.stringify(photo), {
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
    } catch (error) {
      throw new Error('Error while converting');
    }
  },
  update: async (photo: IPhoto): Promise<IPhoto> => {
    try {
      return (
        await imageKitAxiosInstance.put(`${ApiPath.PATH.LIVE_USER}`, JSON.stringify(photo), {
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
    } catch (error) {
      throw new Error('Error while converting');
    }
  },
  updateActivePage: async (photo: IPhoto): Promise<string> => {
    try {
      return (
        await imageKitAxiosInstance.put(ApiPath.PATH.LIVE_USER_ACTIVE_PAGE, JSON.stringify(photo), {
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
    } catch (error) {
      throw new Error('Error while converting');
    }
  },
  clearActivePage: async (photo: IPhoto): Promise<string> => {
    try {
      return (
        await imageKitAxiosInstance.put(ApiPath.PATH.LIVE_USER_CLEAR_ACTIVE_PAGE, JSON.stringify(photo), {
          headers: { 'Content-Type': 'application/json' },
        })
      ).data;
    } catch (error) {
      throw new Error('Error while converting');
    }
  },
  delete: async (key: string): Promise<string> => {
    try {
      return (await imageKitAxiosInstance.delete(`${ApiPath.PATH.LIVE_USER}/${key}`, { headers: { 'Content-Type': 'application/json' } })).data;
    } catch (error) {
      throw new Error('Error while converting');
    }
  },
};
