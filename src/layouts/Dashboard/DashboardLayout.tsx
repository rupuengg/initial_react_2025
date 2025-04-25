import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Notification } from 'components';
import { Footer, Header } from './Common';
import { Sidebar } from './Common/Sidebar';
import './DashboardLayout.scss';

interface IDashboardLayout {
  children: React.JSX.Element | React.JSX.Element[];
}

export const DashboardLayout: React.FC<IDashboardLayout> = ({ children }) => {
  const params = useParams();

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
