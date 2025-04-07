import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { E_Icon_Name } from 'enums';
import { Icon } from 'components/Icon';

export const SocialMedia = () => {
  const handleOpen = useCallback((link: string) => {
    window.open(link, '_blank');
  }, []);

  return (
    <div className='social-media'>
      <Link to={''} onClick={() => handleOpen('https://www.facebook.com')}>
        <Icon iconName={E_Icon_Name.FACEBOOK} />
      </Link>
      <Link to={''} onClick={() => handleOpen('https://www.x.com')}>
        <Icon iconName={E_Icon_Name.TWITTER} />
      </Link>
      <Link to={''} onClick={() => handleOpen('https://www.instagram.com')}>
        <Icon iconName={E_Icon_Name.INSTAGRAM} />
      </Link>
      <Link to={''} onClick={() => handleOpen('https://linkedin.com')}>
        <Icon iconName={E_Icon_Name.LINKDIN} />
      </Link>
      <Link to={''} onClick={() => handleOpen('https://whatsapp.com/channel/0029VbAkBy1DOQIef5gQv40P')}>
        <Icon iconName={E_Icon_Name.WHATSAPP} />
      </Link>
    </div>
  );
};
