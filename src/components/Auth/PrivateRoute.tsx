import { DashboardLayout } from 'layouts';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { E_Is_Login } from 'enums';
import { useAuth } from 'hooks';
import { MainContent } from 'components/MainContent';

export const PrivateRoute = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLogin } = useAuth();

  useEffect(() => {
    if (isLogin === E_Is_Login.LOGIN) {
      if (params['*'] === 'login') navigate('/admin/dashboard');
    } else if (isLogin === E_Is_Login.NOT_LOGIN) {
      navigate('/admin/login');
    }
  }, [params['*'], isLogin, navigate]);

  if (isLogin === E_Is_Login.CHECKING) return null;

  return (
    <DashboardLayout>
      <MainContent />
    </DashboardLayout>
  );
};
