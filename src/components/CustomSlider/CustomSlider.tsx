import React, { useEffect, useState } from 'react';
import './CustomSlider.scss';

export interface ICustomSliderItem {
  image: string;
  title: string;
}

export interface ICustomSlider {
  items: ICustomSliderItem[];
}

export const CustomSlider: React.FC<ICustomSlider> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      const timer = setTimeout(() => {
        slideNext();
        setSlideDone(true);
      }, 5000);
      setTimeID(timer);
    }
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex(val => {
      if (val >= items.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex(val => {
      if (val <= 0) {
        return items.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div className='custom_slider' onMouseEnter={AutoPlayStop} onMouseLeave={AutoPlayStart}>
      {items.map((item, index) => {
        return (
          <div className={'slider_item slider_item-active-' + (activeIndex + 1)} key={index}>
            <img key={index} src={item.image} alt={item.title} />
          </div>
        );
      })}

      <div className='slider_links'>
        {items.map((item, index) => {
          return (
            <button
              key={index}
              className={activeIndex === index ? 'slider_links-small slider_links-small-active' : 'slider_links-small'}
              onClick={e => {
                e.preventDefault();
                setActiveIndex(index);
              }}
            ></button>
          );
        })}
      </div>

      <button
        className='btn-next'
        onClick={e => {
          e.preventDefault();
          slideNext();
        }}
      >
        {'>'}
      </button>
      <button
        className='btn-prev'
        onClick={e => {
          e.preventDefault();
          slidePrev();
        }}
      >
        {'<'}
      </button>
    </div>
  );
};
