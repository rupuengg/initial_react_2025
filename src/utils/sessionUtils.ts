import { IUserToken } from 'store';

export const SessionUtils = () => {
  return {
    saveToken: (data: IUserToken) => {
      sessionStorage.setItem('token', JSON.stringify(data));
    },
    getToken: (): IUserToken | null => {
      const data = sessionStorage.getItem('token');
      if (data) return JSON.parse(data);

      return null;
    },
    clearToken: () => {
      sessionStorage.removeItem('token');
    },
    check: () => {
      const data = sessionStorage.getItem('token');
      if (data) return true;
      return false;
    },
  };
};
