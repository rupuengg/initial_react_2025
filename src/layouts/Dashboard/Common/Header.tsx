import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from 'components';

export const Header = () => {
  const navigate = useNavigate();

  const handleLoggedOut = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    sessionStorage.removeItem('token');
    navigate('/admin/login');
  }, []);

  return (
    <div className={`mainHeader`}>
      <div className='lowerHeader'>
        <div className='siteCssFullWidth'>
          <div className='navBar'>
            <div className='logo-box'>
              <Link to='/'>
                <Logo />
              </Link>
            </div>
            <div className='navMenu'>
              <ul>
                <li>
                  <Link className='link' to='/admin/logout' onClick={handleLoggedOut}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
