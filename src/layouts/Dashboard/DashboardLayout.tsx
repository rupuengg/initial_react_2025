import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
      {/* Header */}
      <Header />
      {/* End */}

      <div className='conatainer'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='content'>{children}</div>
      </div>

      {/* Footer Start */}
      <Footer />
      {/* End */}
    </div>
  );
};
