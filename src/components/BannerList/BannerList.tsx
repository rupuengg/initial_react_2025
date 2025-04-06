import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'store';
import './BannerList.scss';

interface IBannerList {
  text?: string;
  isHideAnimation?: boolean;
}

export const BannerList: React.FC<IBannerList> = ({ isHideAnimation }) => {
  const { banners } = useSelector((state: IApplicationState) => state.global);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isHideAnimation) {
      const timer1 = setTimeout(() => {
        let newIndex = activeIndex + 1;
        if (newIndex >= banners.length) {
          newIndex = 0;
        }
        setActiveIndex(newIndex);
      }, 2000);

      return () => {
        clearTimeout(timer1);
      };
    } else {
      setActiveIndex(Math.floor(Math.random() * 5) + 0);
    }
  }, [isHideAnimation]);

  return (
    <div className='bannerBox'>
      <div>
        {banners.map((item, index) => (
          <div key={`banner-${index}`} className={`bannerItem ${index === activeIndex ? 'active' : ''}`}>
            <div className='slideItem' style={{ backgroundImage: 'url(' + item.img + ')' }}>
              {/* <div className='contentBox'>
                <h1 className='header1'>{text || item.txt}</h1>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
