import { INavigation } from 'entities';
import { backendApiAxiosInstance } from 'store/services/axios';

export interface IMenuApi {
  get(endpoint: string): Promise<INavigation[]>;
}

export const MenuApi: IMenuApi = {
  get: async (endpoint: string): Promise<INavigation[]> => {
    try {
      const response = await backendApiAxiosInstance.get(endpoint, { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      return [];
    }
  },
};
