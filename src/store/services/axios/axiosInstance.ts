import axios from 'axios';
import { encodeUrl } from 'utils';

export const tokenReference: { token: string | undefined } = {
  token: undefined,
};

export const axiosWithIntercepter = (baseURL: string | undefined) => {
  const axiosInstance = axios.create({ baseURL });

  axiosInstance.interceptors.request.use(
    config => {
      // Modify the config object to include the token in the headers
      if (config.headers && tokenReference.token) config.headers.Authorization = `Bearer ${tokenReference.token}`;

      if (config.url) config.url = encodeUrl(config.url);

      return config;
    },
    error => Promise.reject(error)
  );

  return axiosInstance;
};
