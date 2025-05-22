import { IMenuGroupEntity } from 'entities';
import { backendApiAxiosInstance } from 'store/services/axios';

export interface IMenuGroupApi {
  get(endpoint: string): Promise<IMenuGroupEntity>;
}

export const MenuGroupApi: IMenuGroupApi = {
  get: async (endpoint: string): Promise<IMenuGroupEntity> => {
    try {
      const response = await backendApiAxiosInstance.get(endpoint, { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      throw new Error('Error while converting');
    }
  },
};
