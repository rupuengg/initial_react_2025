// import { useEffect, useState } from 'react';
import { SessionUtils } from 'utils';

export const useToken = () => {
  // const [token, setToken] = useState<string | null>(null);

  const token = SessionUtils().getToken();
  // useEffect(() => {
  //   const t = sessionStorage.getItem('token');

  //   if (t) setToken(t);
  // }, []);

  return token;
};
