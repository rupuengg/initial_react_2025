import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { E_Icon_Name } from 'enums';
import { IApplicationState } from 'store';
import { Icon } from 'components/Icon';

export const SocialMedia = () => {
  const { basicConfig } = useSelector((state: IApplicationState) => state.global);

  const socialMediaLink = useMemo(() => {
    if (basicConfig?.socialMediaLink) return JSON.parse(basicConfig?.socialMediaLink);
    return null;
  }, [basicConfig?.socialMediaLink]);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) {
      e.preventDefault();
      window.open(e.currentTarget.href, '_blank');
    }
  }, []);

  if (!basicConfig) return null;

  return (
    <div className='social-media'>
      {socialMediaLink[E_Icon_Name.FACEBOOK] && (
        <Link to={socialMediaLink[E_Icon_Name.FACEBOOK]} onClick={handleOpen}>
          <Icon iconName={E_Icon_Name.FACEBOOK} />
        </Link>
      )}
      {socialMediaLink[E_Icon_Name.TWITTER] && (
        <Link to={socialMediaLink[E_Icon_Name.TWITTER]} onClick={handleOpen}>
          <Icon iconName={E_Icon_Name.TWITTER} />
        </Link>
      )}
      {socialMediaLink[E_Icon_Name.INSTAGRAM] && (
        <Link to={socialMediaLink[E_Icon_Name.INSTAGRAM]} onClick={handleOpen}>
          <Icon iconName={E_Icon_Name.INSTAGRAM} />
        </Link>
      )}
      {socialMediaLink[E_Icon_Name.LINKDIN] && (
        <Link to={socialMediaLink[E_Icon_Name.LINKDIN]} onClick={handleOpen}>
          <Icon iconName={E_Icon_Name.LINKDIN} />
        </Link>
      )}
      {socialMediaLink[E_Icon_Name.PINTEREST] && (
        <Link to={socialMediaLink[E_Icon_Name.PINTEREST]} onClick={handleOpen}>
          <Icon iconName={E_Icon_Name.PINTEREST} />
        </Link>
      )}
      {socialMediaLink[E_Icon_Name.WHATSAPP] && (
        <Link to={socialMediaLink[E_Icon_Name.WHATSAPP]} onClick={handleOpen}>
          <Icon iconName={E_Icon_Name.WHATSAPP} />
        </Link>
      )}
      {socialMediaLink[E_Icon_Name.YOUTUBE] && (
        <Link to={socialMediaLink[E_Icon_Name.YOUTUBE]} onClick={handleOpen}>
          <Icon iconName={E_Icon_Name.YOUTUBE} />
        </Link>
      )}
    </div>
  );
};
