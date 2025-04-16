// import { useEffect, useState } from 'react';

export const useToken = () => {
  // const [token, setToken] = useState<string | null>(null);

  const token = sessionStorage.getItem('token');
  // useEffect(() => {
  //   const t = sessionStorage.getItem('token');

  //   if (t) setToken(t);
  // }, []);

  return token;
};
