import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faMailReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocialMedia } from 'components';

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
              <SocialMedia />
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
