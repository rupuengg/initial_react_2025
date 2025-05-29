import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { E_Is_Login } from 'enums';
import { useAuth } from 'hooks';
import { IApplicationState, IUseDispatch, useAppDispatch } from 'store';
import { authLogin } from 'store/thunk/authThunk';
import { Logo } from 'components/Logo';
import './Login.scss';

export const Login = () => {
  const { authProfile } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { isLogin } = useAuth(authProfile);
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (authProfile) {
      navigate('/admin/dashboard');
    }
  }, [authProfile, navigate]);

  useEffect(() => {
    if (isLogin === E_Is_Login.LOGIN) {
      if (params['*'] === 'login') navigate('/admin/dashboard');
    }
  }, [isLogin, params, navigate]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  }, []);

  const handleLogin = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dispatch(authLogin({ cw1: username, cw2: password }));
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
              <div className='form-field marginTop20'>
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
                    Submit
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
