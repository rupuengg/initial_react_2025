import { E_Icon_Name } from 'enums';
import { Icon, SocialMedia } from 'components';

export const Topper = () => {
  return (
    <div className='mainTopper'>
      <div className='topHeader'>
        <div className='siteCssWidth1200'>
          <div className='contactInfo'>
            <div className='child'>
              <Icon iconName={E_Icon_Name.EMAIL} style={{ display: 'inline-flex' }} />
              <a href='mailto:shabadinteriors@gmail.com'>sales@panacheworld.in</a>
            </div>
            <div className='child'>
              <SocialMedia />
              <div className='phone'>
                <Icon iconName={E_Icon_Name.PHONE} style={{ display: 'inline-flex' }} />
                <a href='tel:9599385377'>+91-9599385377</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
