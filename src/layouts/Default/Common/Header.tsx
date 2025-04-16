import { faList } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INavigation } from 'models/Navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { IApplicationState } from 'store';
import { Logo } from 'components';
import { Topper } from './Topper';

export const Header = () => {
  const { navigation } = useSelector((state: IApplicationState) => state.global);
  const [isShowSubMenu, setIsShowSubMenu] = useState(false);
  const [isFixedHeader, setIsFixedHeader] = useState(false);

  useEffect(() => {
    const scrollCallback = (e: any) => {
      if (e.currentTarget.scrollY > 110) {
        setIsFixedHeader(true);
      } else {
        setIsFixedHeader(false);
      }
    };

    window.addEventListener('scroll', scrollCallback);
    return () => {
      window.removeEventListener('scroll', scrollCallback);
    };
  }, []);

  const makeMenu = (items: INavigation[], parentIndex: number = 0) => {
    return items.map((item, index) => (
      <li key={`${parentIndex === 0 ? 'mainMenu-' : 'subMenu'}parentIndex - ${index}`}>
        <NavLink to={item.link} className={({ isActive }) => (isActive ? 'link active' : 'link inactive')} onClick={() => setIsShowSubMenu(false)}>
          {item.title}
        </NavLink>
        {item.items && item.items.length > 0 && <ul>{makeMenu(item.items, index)}</ul>}
      </li>
    ));
  };

  return (
    <>
      <Topper />
      <div className={`mainHeader${isFixedHeader ? ' fixed' : ''}`}>
        <div className='lowerHeader'>
          <div className='siteCssWidth1200'>
            <div className='navBar'>
              <div className='logo-box'>
                <Link to='/'>
                  <Logo />
                </Link>
              </div>
              <div className='navMenu'>
                <nav className='navMenuIcon'>
                  <div className='navbar-header'>
                    <button type='button' onClick={() => setIsShowSubMenu(!isShowSubMenu)}>
                      <FontAwesomeIcon icon={isShowSubMenu ? faTimesCircle : faList} />
                    </button>
                  </div>
                  <ul className={`navigation${isShowSubMenu ? ' open' : ''}`}>{makeMenu(navigation, 0)}</ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
