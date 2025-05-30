import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from 'entities';
import { E_Is_Login } from 'enums';
import { useAuth } from 'hooks';
import { GlobalActions, IUseDispatch, useAppDispatch } from 'store';
import { Notification } from 'components';
import { Footer, Header } from './Common';
import { Sidebar } from './Common/Sidebar';
import './DashboardLayout.scss';

interface IDashboardLayout {
  children: React.JSX.Element | React.JSX.Element[];
}

export const DashboardLayout: React.FC<IDashboardLayout> = ({ children }) => {
  const dispatch: IUseDispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const updateProfile = useCallback((profile: IUser) => {
    dispatch(GlobalActions.setAuthProfile(profile));
  }, []);

  const auth = useAuth(updateProfile);

  useEffect(() => {
    if (auth.isLogin === E_Is_Login.NOT_LOGIN && params['*'] === '') navigate('/admin/login');
    if (auth.isLogin === E_Is_Login.NOT_LOGIN && params['*'] === 'dashboard') navigate('/admin/login');
  }, [auth]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);

  return (
    <div className='dashboard_layout'>
      <Header />

      <div className='conatainer'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='content'>
          <div className='inner'>{children}</div>
        </div>
      </div>

      <Notification />

      <Footer />
    </div>
  );
};
