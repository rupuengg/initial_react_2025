import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { INavigation } from 'entities';
import { E_Icon_Name } from 'enums';
import { IApplicationState } from 'store';
import { Icon, LogoSvg, SocialMedia } from 'components';

export const Footer = () => {
  const { mainMenuGroup } = useSelector((state: IApplicationState) => state.global);

  const mainMenus = useMemo(() => {
    let m: INavigation[] = [];
    if (mainMenuGroup && mainMenuGroup.menus) m = [...mainMenuGroup.menus];

    if (m.length > 0)
      m.sort((a: INavigation, b: INavigation) => {
        const aId = a.id ? a.id : 0;
        const bId = b.id ? b.id : 0;
        return aId > bId ? 1 : aId < bId ? -1 : 0;
      });
    return m;
  }, [mainMenuGroup]);

  const makeMenu = (items: INavigation[], parentIndex: number = 0) => {
    return items.map((item, index) => (
      <li key={`${parentIndex === 0 ? 'mainMenu-' : 'subMenu'}parentIndex - ${index}`}>
        <NavLink to={item.route} className={({ isActive }) => (isActive ? 'link active' : 'link inactive')}>
          {item.title}
        </NavLink>
        {item.subMenus && item.subMenus.length > 0 && <ul>{makeMenu(item.subMenus, index)}</ul>}
      </li>
    ));
  };

  return (
    <div className='footer'>
      <div className='main_box'>
        <ul>
          <li className='logo'>
            <Link to='/'>
              {/* <img src={logoNoBackground} alt='PanacheWorld Interior' /> */}
              <LogoSvg titleColor='#ddceb0' />
            </Link>
          </li>
          <li className='middle'>
            <p>
              <Icon iconName={E_Icon_Name.EMAIL} style={{ display: 'inline-flex', fill: '#ffffff' }} />
              <a href='mailto:shabadinteriors@gmail.com'>sales@panacheworld.in</a>
            </p>
            <p>
              <Icon iconName={E_Icon_Name.PHONE} style={{ display: 'inline-flex', fill: '#ffffff' }} />
              <a href='tel:9599385377'>+91-9599385377</a>
            </p>
            <p style={{ display: 'flex' }}>
              <span style={{ display: 'flex', alignItems: 'center', width: '12px' }}>
                <Icon className='whatsapp-icon' style={{ width: '15px', height: '15px', display: 'inline-flex' }} iconName={E_Icon_Name.WHATSAPP} />
              </span>
              <a target='_blank' href='https://wa.me/9599385377?text=' rel='noreferrer'>
                +91-9599385377
              </a>
            </p>
            <hr />
            <SocialMedia />
          </li>
          <li className='sitemap'>
            <ul className='nav-sitemap'>{makeMenu(mainMenus, 0)}</ul>
          </li>
          <li className='copy'>Copyright &copy; 2021 panacheworld.in. All right reserved</li>
        </ul>
      </div>
    </div>
  );
};
