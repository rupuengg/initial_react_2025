import { IUserToken } from 'store';

export const SessionUtils = () => {
  return {
    saveToken: (data: IUserToken) => {
      localStorage.setItem('token', JSON.stringify(data));
    },
    getToken: (): IUserToken | null => {
      const data = localStorage.getItem('token');
      if (data) return JSON.parse(data);

      return null;
    },
    clearToken: () => {
      localStorage.removeItem('token');
    },
    check: () => {
      const data = localStorage.getItem('token');
      if (data) return true;
      return false;
    },
  };
};
