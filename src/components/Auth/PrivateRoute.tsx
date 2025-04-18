import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { E_Is_Login } from 'enums';
import { useAuth } from 'hooks';
import { IApplicationState } from 'store';
import { Blogs, Dashboard, SiteConfig } from 'components/Admin';
import { Login } from './Login';

export const PrivateRoute = () => {
  const { sidebarNavigations } = useSelector((state: IApplicationState) => state.global);
  const params = useParams();
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  const renderComp = useCallback((path: string) => {
    switch (path) {
      case '/dashboard':
        return <Dashboard />;
      case '/blogs':
        return <Blogs />;
      case '/setting':
        return <SiteConfig />;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    if (isLogin === E_Is_Login.LOGIN) {
      if (params['*'] === 'login') navigate('/admin/dashboard');
    } else if (isLogin === E_Is_Login.NOT_LOGIN) {
      if (params['*'] !== 'login') navigate('/admin/login');
    }
  }, [params, isLogin, navigate]);

  if (isLogin === E_Is_Login.CHECKING) return null;

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={'/admin/login'} replace />} />
        <Route key='login' path={'/login'} element={<Login />} />
        {sidebarNavigations.map(nav => (
          <Route key={nav.link} path={nav.link + '/*'} element={renderComp(nav.link)} />
        ))}
      </Route>
    </Routes>
  );
};
