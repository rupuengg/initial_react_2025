import { IUser } from 'models';
import { useEffect, useState } from 'react';
import { E_Is_Login } from 'enums';
import { decryption } from 'utils';
import { useToken } from './useToken';

interface IAuth {
  user?: IUser;
  isLogin: E_Is_Login;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<IAuth>({ isLogin: E_Is_Login.CHECKING });

  const token = useToken();
  // const user = useFirebase();

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(user.auth, user =>
    //   setAuth({
    //     user: user ?? false,
    //   })
    // );
    try {
      const d = JSON.parse(decryption(token));
      if (d) {
        setAuth({ user: d, isLogin: E_Is_Login.LOGIN });
      }
    } catch {
      setAuth({ isLogin: E_Is_Login.NOT_LOGIN });
    }
  }, [token]);

  return auth;
};
