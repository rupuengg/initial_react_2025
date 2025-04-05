import { Footer, Header } from 'pages';
import React from 'react';
import './DefaultLayout.scss';

interface IDefaultLayout {
  children: React.JSX.Element | React.JSX.Element[];
}

export const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
  return (
    <div className='default_layout'>
      {/* Header */}
      <Header />
      {/* End */}

      <div className='conatainer'>{children}</div>

      {/* Footer Start */}
      <Footer />
      {/* End */}
    </div>
  );
};
