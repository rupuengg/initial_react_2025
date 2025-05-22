import { IGallery, IOffer, IPhoto, ITestimonialEntity } from 'entities';
import { staticBackendApiAxiosInstance } from './axios';

export interface IGlobalApi {
  getTestimonial(): Promise<ITestimonialEntity[]>;
  getOffers(): Promise<IOffer[]>;
  getJsonAllGallery(): Promise<IGallery[]>;
  getJsonAllPhotos(): Promise<IPhoto[]>;
}

export const GlobalApi: IGlobalApi = {
  getTestimonial: async (): Promise<ITestimonialEntity[]> => {
    try {
      const response = await staticBackendApiAxiosInstance.get('testimonial.json', { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      return [];
    }
  },
  getOffers: async (): Promise<IOffer[]> => {
    try {
      const response = await staticBackendApiAxiosInstance.get('offers.json', { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      return [];
    }
  },
  getJsonAllGallery: async (): Promise<IGallery[]> => {
    try {
      const response = await staticBackendApiAxiosInstance.get('galleries.json', { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      return [];
    }
  },
  getJsonAllPhotos: async (): Promise<IPhoto[]> => {
    try {
      const response = await staticBackendApiAxiosInstance.get('allphotos.json', { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      return [];
    }
  },
};
