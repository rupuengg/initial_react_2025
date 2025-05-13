import { IGallery, IPhoto } from 'entities';
import { ApiPath } from 'store/constants';
import { backendApiAxiosInstance } from './axios';

export interface IGalleryApi {
  getAllGallery(): Promise<IGallery[]>;
  getAllPhotos(galleryId: string): Promise<IPhoto[]>;
  getAllDonePhotos(galleryId: string): Promise<IPhoto[]>;
  getAllUnderConstructionPhotos(galleryId: string): Promise<IPhoto[]>;
}

export const GalleryApi: IGalleryApi = {
  getAllGallery: async (): Promise<IGallery[]> => {
    try {
      const response = await backendApiAxiosInstance.get(`${ApiPath.PATH.ROUTE_PATH.GALLERY_PATH}`, { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      return [];
    }
  },
  getAllPhotos: async (galleryId: string): Promise<IPhoto[]> => {
    try {
      const api = ApiPath.PATH.GALLERY_ALLPHOTOS.replace('{galleryId}', galleryId);
      const response = await backendApiAxiosInstance.get(api, { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      return [];
    }
  },
  getAllDonePhotos: async (galleryId: string): Promise<IPhoto[]> => {
    try {
      const api = ApiPath.PATH.GALLERY_ONLY_DONE_PHOTOS.replace('{galleryId}', galleryId);
      const response = await backendApiAxiosInstance.get(api, { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      return [];
    }
  },
  getAllUnderConstructionPhotos: async (galleryId: string): Promise<IPhoto[]> => {
    try {
      const api = ApiPath.PATH.GALLERY_ONLY_UNDER_PHOTOS.replace('{galleryId}', galleryId);
      const response = await backendApiAxiosInstance.get(api, { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      return [];
    }
  },
};
