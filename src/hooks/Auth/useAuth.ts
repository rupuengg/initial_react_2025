import { useEffect, useState } from 'react';
import { IUser } from 'entities';
import { E_Is_Login } from 'enums';
import { SessionUtils } from 'utils';
import { IUserToken } from 'store';
import { tokenReference } from 'store/services/axios';
import { useToken } from './useToken';

interface IAuth {
  isLogin: E_Is_Login;
}

export const useAuth = (callback?: (profile: IUser) => void) => {
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
      if (token) tokenReference.token = token.token;

      if (token) {
        setAuth({ isLogin: E_Is_Login.LOGIN });
        const data: IUserToken | null = SessionUtils().getToken();
        if (data?.user && callback) callback(data.user);
      } else {
        setAuth({ isLogin: E_Is_Login.NOT_LOGIN });
      }
    } catch {
      setAuth({ isLogin: E_Is_Login.NOT_LOGIN });
    }
  }, []);

  return auth;
};
