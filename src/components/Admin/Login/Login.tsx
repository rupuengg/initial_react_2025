import { defaultUser } from 'mock';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { E_Is_Login } from 'enums';
import { useAuth } from 'hooks';
import { encryption } from 'utils';
import { Logo } from 'components/Logo';
import './Login.scss';

export const Login = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('admin');

  useEffect(() => {
    if (isLogin === E_Is_Login.LOGIN) {
      if (params['*'] === 'login') navigate('/admin/dashboard');
    }
  }, [isLogin, params.id]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') setUsername(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  }, []);

  const handleLogin = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('username, password', username, password);
    if (username === 'admin' && password === 'admin') {
      const token = encryption(JSON.stringify(defaultUser));
      sessionStorage.setItem('token', token);
      navigate('/admin/dashboard');
    }
  }, []);

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
            <div className='form-box'>
              <div className='form-field marginTop20'>
                <label>Email</label>
                <div className='box'>
                  <input name='email' type='text' value={username} onChange={handleChange} />
                </div>
              </div>
              <div className='form-field marginTop20'>
                <label>Password</label>
                <div className='box'>
                  <input name='password' type='password' value={password} onChange={handleChange} />
                </div>
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
