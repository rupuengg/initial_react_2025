import { IBlogEntity } from 'entities';
import { backendApiAxiosInstance } from 'store/services/axios';

export interface IBlogApi {
  get(endpoint: string): Promise<IBlogEntity[]>;
}

export const BlogApi: IBlogApi = {
  get: async (endpoint: string): Promise<IBlogEntity[]> => {
    try {
      const response = await backendApiAxiosInstance.get(endpoint, { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      return [];
    }
  },
};
