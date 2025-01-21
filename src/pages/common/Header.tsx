import './Header.scss';
// import { faList } from '@fortawesome/free-solid-svg-icons';
// import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INavigation } from 'models/Navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IApplicationState } from 'store';
import { Logo } from 'components';

export const Header = () => {
  const { navigation } = useSelector((state: IApplicationState) => state.global);
  const [isShowSubMenu, setIsShowSubMenu] = useState(false);

  const makeMenu = (items: INavigation[], parentIndex: number = 0) => {
    return items.map((item, index) => (
      <li key={`${parentIndex === 0 ? 'mainMenu-' : 'subMenu'}parentIndex - ${index}`}>
        <Link to={item.link} className='' onClick={() => setIsShowSubMenu(false)}>
          {item.title}
        </Link>
        {item.items && <ul>{makeMenu(item.items, index)}</ul>}
      </li>
    ));
  };

  return (
    <div className='mainHeader'>
      <div className='topHeader'>
        <div className='siteCss'>
          <ul className='contactInfo'>
            <li>
              <span>PHONE : </span>
              <a href='tel:9810681281'>+91-9045096124</a>
            </li>
            <li>
              <span>EMAIL : </span> <a href='mailto:shabadinteriors@gmail.com'>sales@panacheworld.in</a>
            </li>
          </ul>
          <div className='clear'></div>
        </div>
      </div>
      <div className='lowerHeader'>
        <div className='siteCss'>
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
                    {/* <FontAwesomeIcon icon={isShowSubMenu ? faTimesCircle : faList} /> */}
                  </button>
                </div>
                <ul className={`navigation ${isShowSubMenu ? 'open' : ''}`}>{makeMenu(navigation, 0)}</ul>
                <div className='clear'></div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
