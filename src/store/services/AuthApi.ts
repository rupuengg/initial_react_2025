import { IUser } from 'entities';
import { ApiPath } from 'store/constants';
import { ILoginInput, IUserToken } from 'store/states';
import { backendApiAxiosInstance } from './axios';

export interface IAuthApi {
  login(loginData: ILoginInput): Promise<IUserToken>;
  logout(): Promise<void>;
  profile(): Promise<IUser>;
}

export const AuthApi: IAuthApi = {
  login: async (loginData: ILoginInput): Promise<IUserToken> => {
    try {
      const response = await backendApiAxiosInstance.post(`${ApiPath.PATH.AUTH.LOGIN}`, JSON.stringify(loginData), { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      throw new Error('Error while loging');
    }
  },
  logout: async (): Promise<void> => {
    try {
      const response = await backendApiAxiosInstance.delete(ApiPath.PATH.AUTH.LOGOUT, { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      throw new Error('Error while logout');
    }
  },
  profile: async (): Promise<IUser> => {
    try {
      const response = await backendApiAxiosInstance.get(ApiPath.PATH.AUTH.PROFILE, { headers: { 'Content-Type': 'application/json' } });
      return response.data.data;
    } catch {
      throw new Error('Error while getting profile');
    }
  },
};
