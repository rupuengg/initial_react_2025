import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { E_Icon_Name } from 'enums';
import { Icon } from 'components/Icon';

export const SocialMedia = () => {
  const handleOpen = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) {
      e.preventDefault();
      window.open(e.currentTarget.href, '_blank');
    }
  }, []);

  return (
    <div className='social-media'>
      <Link to={'https://www.facebook.com'} onClick={handleOpen}>
        <Icon iconName={E_Icon_Name.FACEBOOK} />
      </Link>
      <Link to={'https://x.com/Panachew0rld'} onClick={handleOpen}>
        <Icon iconName={E_Icon_Name.TWITTER} />
      </Link>
      <Link to={'https://www.instagram.com/panachew0rld'} onClick={handleOpen}>
        <Icon iconName={E_Icon_Name.INSTAGRAM} />
      </Link>
      <Link to={'https://www.linkedin.com/in/panacheworld-interior-763b1a35b'} onClick={handleOpen}>
        <Icon iconName={E_Icon_Name.LINKDIN} />
      </Link>
      <Link to={'https://whatsapp.com/channel/0029VbAkBy1DOQIef5gQv40P'} onClick={handleOpen}>
        <Icon iconName={E_Icon_Name.WHATSAPP} />
      </Link>
    </div>
  );
};
