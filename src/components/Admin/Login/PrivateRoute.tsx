import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { E_Is_Login } from 'enums';
import { useAuth } from 'hooks';
import { Blogs, Dashboard, Login, Setting } from 'components';

export const PrivateRoute = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  useEffect(() => {
    if (isLogin === E_Is_Login.LOGIN) {
      if (params['*'] === 'login') navigate('/admin/dashboard');
    } else if (isLogin === E_Is_Login.NOT_LOGIN) {
      if (params['*'] !== 'login') navigate('/admin/login');
    }
    // if (isLogin === E_Is_Login.LOGIN && params['*'] === 'login') {
    //   navigate('/admin/dashboard');
    // } else if (isLogin === E_Is_Login.NOT_LOGIN && params['*'] !== 'login') {
    //   navigate('/admin/login');
    // }
  }, [isLogin, params.id]);

  if (isLogin === E_Is_Login.CHECKING) return null;

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={'/admin/login'} replace />} />
        <Route key='login' path={'/login'} element={<Login />} />
        <Route key='dashboard' path={'/dashboard'} element={<Dashboard />} />
        <Route key='dashboard' path={'/setting'} element={<Setting />} />
        <Route key='dashboard' path={'/blogs'} element={<Blogs />} />
      </Route>
    </Routes>
  );
};
