import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IUseDispatch, useAppDispatch } from 'store';
import { authLogout } from 'store/thunk/authThunk';
import { FontIcon, Logo } from 'components';

export const Header = () => {
  const dispatch: IUseDispatch = useAppDispatch();
  const [gear, setGear] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleGearClick = useCallback(() => {
    setGear(s => !s);
  }, []);

  const handleLoggedOut = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      dispatch(authLogout());
      setTimeout(() => {
        navigate('/admin/login');
      }, 1000);
    },
    [navigate]
  );

  return (
    <div className={`mainHeader`}>
      <div className='lowerHeader'>
        <div className='siteCssFullWidth'>
          <div className='navBar'>
            <div className='logo-box'>
              <Link to='/'>
                <Logo titleColor='#ddceb0' />
              </Link>
            </div>
            <div className='popup-menu'>
              <div className='setting' onClick={handleGearClick}>
                <FontIcon isDisabled={false} color={'#bb8f71'} icon={faGear} />
              </div>
              {gear && (
                <div className='sub-menu'>
                  <ul>
                    <li>
                      <Link className='link' to='/admin/profile'>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className='link' to='/admin/logout' onClick={handleLoggedOut}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
