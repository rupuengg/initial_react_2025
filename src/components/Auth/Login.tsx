import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from 'entities';
import { E_Is_Login } from 'enums';
import { useAuth } from 'hooks';
import { GlobalActions, IApplicationState, IUseDispatch, useAppDispatch } from 'store';
import { authLogin } from 'store/thunk/authThunk';
import { Logo } from 'components/Logo';
import './Login.scss';

export const Login = () => {
  const { authProfile, loginError } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAuth((profile: IUser) => {
    dispatch(GlobalActions.setAuthProfile(profile));
  });
  // const { isLogin } = useAuth(authProfile);
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (auth.isLogin === E_Is_Login.LOGIN || authProfile) navigate('/admin/dashboard');
  }, [auth, authProfile]);

  // useEffect(() => {
  //   if (isLogin === E_Is_Login.LOGIN) navigate('/admin/dashboard');
  //   // else if (!isLogin) {
  //   //   navigate('/admin/login');
  //   // }
  // }, [isLogin]);

  // useEffect(() => {
  //   if (isLogin === E_Is_Login.LOGIN) {
  //     if (params['*'] === 'login') navigate('/admin/dashboard');
  //   }
  // }, [isLogin, params, navigate]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  }, []);

  const handleLogin = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dispatch(GlobalActions.setClearLoginError());
      dispatch(authLogin({ username: username, password: password }));
    },
    [username, password, navigate, dispatch]
  );

  return (
    <div className='siteCssForLogin'>
      <div className='login-page'>
        <div className='inner'>
          <div className='content'>
            <div className='logo-box'>
              <Link to='/'>
                <Logo />
              </Link>
            </div>
            <h1 className='header1'>Admin Login</h1>

            <div className='form-layouts'>
              <div className='form-field'>
                <p className='error not_absolute'>{loginError}</p>
              </div>
              <div className='form-field'>
                <label>Email</label>
                <div className='field-box box'>
                  <input name='email' type='text' value={username} onChange={handleChange} />
                </div>
                <span className='error'></span>
              </div>
              <div className='form-field marginTop20'>
                <label>Password</label>
                <div className='field-box box'>
                  <input name='password' type='password' value={password} onChange={handleChange} />
                </div>
                <span className='error'></span>
              </div>
              <div className='form-field marginTop40'>
                <div className='button'>
                  <button type='submit' onClick={handleLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
