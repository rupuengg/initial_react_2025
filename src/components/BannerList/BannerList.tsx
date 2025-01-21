import './BannerList.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'store';

export const BannerList = () => {
  const { banners } = useSelector((state: IApplicationState) => state.global);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
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
  });

  return (
    <div className='bannerBox'>
      <div>
        {banners.map((item, index) => (
          <div key={`banner-${index}`} className={`bannerItem ${index === activeIndex ? 'active' : ''}`}>
            <div className='slideItem' style={{ backgroundImage: 'url(' + item.img + ')' }}>
              <div className='siteCss'>
                <div className='contentBox'>Text</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
