import { IContactInfoEntity } from 'entities';
import { ApiPath } from 'store/constants';
import { backendApiAxiosInstance } from 'store/services/axios';

export interface IQueryApi {
  raise(contact: IContactInfoEntity): Promise<IContactInfoEntity>;
}

export const QueryApi: IQueryApi = {
  raise: async (contact: IContactInfoEntity): Promise<IContactInfoEntity> => {
    try {
      const response = await backendApiAxiosInstance.post(ApiPath.PATH.QUERY, JSON.stringify(contact), { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      throw new Error('Error while converting');
    }
  },
};
