import { SessionUtils } from 'utils';

export const useToken = () => {
  const token = SessionUtils().getToken();

  return token;
};
