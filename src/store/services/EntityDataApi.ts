import { AxiosInstance } from 'axios';
import { CommonEntity } from 'entities';
import { backendApiAxiosInstance } from 'store/services/axios';
import { IEndpoint } from 'store/states';

export const axioInstance: { [x: string]: AxiosInstance } = {
  backend: backendApiAxiosInstance,
};

export interface IEntityDataApi {
  get(domain: string, endpoint: IEndpoint): Promise<CommonEntity[]>;
  getByKey(domain: string, endpoint: IEndpoint, key: string): Promise<CommonEntity>;
  post(domain: string, endpoint: IEndpoint, data: CommonEntity): Promise<CommonEntity>;
  put(domain: string, endpoint: IEndpoint, data: CommonEntity): Promise<CommonEntity>;
  delete(domain: string, endpoint: IEndpoint, key: string): Promise<string>;
}

export const EntityDataApi: IEntityDataApi = {
  get: async (domain: string, endpoint: IEndpoint): Promise<CommonEntity[]> => {
    try {
      if (!endpoint.list) throw new Error('Error - Endpoint not exists');
      const response = await backendApiAxiosInstance.get(endpoint.list, { headers: { 'Content-Type': 'application/json' } });
      return response.data;
    } catch {
      return [];
    }
  },
  getByKey: async (domain: string, endpoint: IEndpoint, key: string): Promise<CommonEntity> => {
    try {
      if (!endpoint.get) throw new Error('Error - Endpoint not exists');
      const response = await backendApiAxiosInstance.get(`${endpoint.get}/${key}`, { headers: { 'Content-Type': 'application/json' } });
      return response.data;
    } catch {
      throw new Error('Error while converting');
    }
  },
  post: async (domain: string, endpoint: IEndpoint, data: CommonEntity): Promise<CommonEntity> => {
    try {
      if (!endpoint.save) throw new Error('Error - Endpoint not exists');
      const response = await backendApiAxiosInstance.post(endpoint.save, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
      return response.data;
    } catch {
      throw new Error('Error while converting');
    }
  },
  put: async (domain: string, endpoint: IEndpoint, data: CommonEntity): Promise<CommonEntity> => {
    try {
      if (!endpoint.update) throw new Error('Error - Endpoint not exists');
      const response = await backendApiAxiosInstance.put(endpoint.update, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
      return response.data;
    } catch {
      throw new Error('Error while converting');
    }
  },
  delete: async (domain: string, endpoint: IEndpoint, key: string): Promise<string> => {
    try {
      if (!endpoint.delete) throw new Error('Error - Endpoint not exists');
      const response = await backendApiAxiosInstance.delete(`${endpoint.delete}/${key}`, { headers: { 'Content-Type': 'application/json' } });
      return response.data === '' ? 'OK' : response.data;
    } catch {
      throw new Error('Error while converting');
    }
  },
};
