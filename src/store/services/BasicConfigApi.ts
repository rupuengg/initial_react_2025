import { IBasicConfigEntity, IBlogEntity } from 'entities';
import { ApiPath } from 'store/constants';
import { backendApiAxiosInstance } from 'store/services/axios';

export interface IBasicConfigApi {
  get(): Promise<IBasicConfigEntity>;
}

export const BasicConfigApi: IBasicConfigApi = {
  get: async (): Promise<IBlogEntity> => {
    try {
      const response = await backendApiAxiosInstance.get(ApiPath.PATH.BASIC_CONFIG + 'main', { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      throw new Error('Error while getting basic config');
    }
  },
};
