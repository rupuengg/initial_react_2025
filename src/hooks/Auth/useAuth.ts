import { useEffect, useState } from 'react';
import { IUser } from 'entities';
import { E_Is_Login } from 'enums';
import { IUseDispatch, useAppDispatch } from 'store';
import { tokenReference } from 'store/services/axios';
import { authProfile } from 'store/thunk/authThunk';
import { useToken } from './useToken';

interface IAuth {
  user?: IUser;
  isLogin: E_Is_Login;
}

export const useAuth = (profile: IUser | undefined) => {
  const dispatch: IUseDispatch = useAppDispatch();
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
      if (token) tokenReference.token = token;
      // const d = JSON.parse(decryption(token));
      if (token && profile) {
        setAuth({ user: profile, isLogin: E_Is_Login.LOGIN });
      } else if (token && !profile) {
        dispatch(authProfile());
      } else {
        setAuth({ isLogin: E_Is_Login.NOT_LOGIN });
      }
    } catch {
      setAuth({ isLogin: E_Is_Login.NOT_LOGIN });
    }
  }, [token, profile, dispatch]);

  return auth;
};
