import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faMailReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { E_Icon_Name } from 'enums';
import { Icon } from 'components';
import './Topper.scss';

export const Topper = () => {
  return (
    <div className='mainTopper'>
      <div className='topHeader'>
        <div className='siteCssWidth1200'>
          <div className='contactInfo'>
            <div className='child'>
              <span>
                <FontAwesomeIcon icon={faMailReply} />
              </span>
              <a href='mailto:shabadinteriors@gmail.com'>sales@panacheworld.in</a>
            </div>
            <div className='child'>
              <div className='social-media'>
                <Link to={'https://www.facebook.com/'}>
                  <Icon iconName={E_Icon_Name.FACEBOOK} />
                </Link>
                <Link to={'https://x.com/'}>
                  <Icon iconName={E_Icon_Name.TWITTER} />
                </Link>
                <Link to={'https://www.instagram.com/'}>
                  <Icon iconName={E_Icon_Name.INSTAGRAM} />
                </Link>
                <Link to={'https://linkedin.com'}>
                  <Icon iconName={E_Icon_Name.LINKDIN} />
                </Link>
              </div>
              <div className='phone'>
                <span>
                  <FontAwesomeIcon icon={faPhoneVolume} />
                </span>
                <a href='tel:9810681281'>+91-9599385377</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
