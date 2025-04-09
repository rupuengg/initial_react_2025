// import logoNoBackground from '../../assets/images/logo/logoNoBackground.png';
import { faMailReply, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INavigation } from 'models';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { E_Icon_Name } from 'enums';
import { IApplicationState } from 'store';
import { Icon, SocialMedia } from 'components';
import { LogoSvg } from 'components/Logo/LogoSvg';
import './Footer.scss';

export const Footer = () => {
  const { navigation } = useSelector((state: IApplicationState) => state.global);

  const makeMenu = (items: INavigation[], parentIndex: number = 0) => {
    return items.map((item, index) => (
      <li key={`${parentIndex === 0 ? 'mainMenu-' : 'subMenu'}parentIndex - ${index}`}>
        <NavLink to={item.link} className={({ isActive }) => (isActive ? 'link active' : 'link inactive')}>
          {item.title}
        </NavLink>
        {item.items && item.items.length > 0 && <ul>{makeMenu(item.items, index)}</ul>}
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
              <span>
                <FontAwesomeIcon icon={faMailReply} />
              </span>
              <a href='mailto:shabadinteriors@gmail.com'>sales@panacheworld.in</a>
            </p>
            <p>
              <span>
                <FontAwesomeIcon icon={faPhoneVolume} />
              </span>
              <a href='mailto:shabadinteriors@gmail.com'>+91-9599385377</a>
            </p>
            <p style={{ display: 'flex' }}>
              <span style={{ display: 'flex', alignItems: 'center', width: '12px' }}>
                <Icon className='whatsapp-icon' style={{ width: '15px', height: '15px', display: 'inline-flex' }} iconName={E_Icon_Name.WHATSAPP} />
              </span>
              <a target='_blank' href='https://wa.me/9599385377?text=Hello' rel='noreferrer'>
                +91-9599385377
              </a>
            </p>
            <hr />
            <SocialMedia />
          </li>
          <li className='sitemap'>
            <ul className='nav-sitemap'>{makeMenu(navigation, 0)}</ul>
          </li>
          <li className='copy'>Copyright &copy; 2021 panacheworld.in. All right reserved</li>
        </ul>
      </div>
    </div>
  );
};
