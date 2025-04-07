import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Footer, Header } from 'pages';
import React, { useCallback, useState } from 'react';
import { E_Icon_Name } from 'enums';
import { Icon } from 'components';
import './DefaultLayout.scss';

interface IDefaultLayout {
  children: React.JSX.Element | React.JSX.Element[];
}

export const DefaultLayout: React.FC<IDefaultLayout> = ({ children }) => {
  const [isShowQuery, setIsShowQuery] = useState(false);

  const handleQuery = useCallback(() => {
    setIsShowQuery(p => !p);
  }, []);

  return (
    <div className='default_layout'>
      {/* Header */}
      <Header />
      {/* End */}

      <div className='conatainer'>{children}</div>

      <div className='query'>
        {!isShowQuery && (
          <>
            <div className='text' onClick={handleQuery}>
              Query
            </div>
            <a className='whatsapp' target='_blank' href='https://wa.me/9599385377?text=Hello' rel='noreferrer'>
              <Icon iconName={E_Icon_Name.WHATSAPP} />
            </a>
          </>
        )}
        {isShowQuery && (
          <div className='query_form'>
            <FontAwesomeIcon icon={faClose} onClick={() => setIsShowQuery(p => !p)} />
            <iframe src='https://docs.google.com/forms/d/e/1FAIpQLSdPharPv_A5_XryCnkNpM-3kOELA9BLvnGF5sbdVTYcfW4ZyA/viewform?embedded=true' width='440' height='663' frameBorder='0'></iframe>
          </div>
        )}
      </div>

      {/* Footer Start */}
      <Footer />
      {/* End */}
    </div>
  );
};
