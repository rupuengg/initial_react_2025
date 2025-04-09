import { DefaultLayout } from 'layouts';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useMemo, useState } from 'react';
import { Photo, RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'store';
import './Gallery.scss';

export const Gallery = () => {
  const { photos } = useSelector((state: IApplicationState) => state.global);
  const [index, setIndex] = useState(-1);

  const images = useMemo(() => {
    return photos.map(g => {
      return { src: g.url, width: g.width, height: g.height, url: g.url } as Photo;
    });
  }, [photos]);

  if (!images) return null;

  return (
    <DefaultLayout>
      <div className='siteCss'>
        <div className='gallery_page marginBottom100'>
          <h1 id='/gallery' className='header1'>
            Gallery - Our work
          </h1>
          <div className='p0 m0 marginTop50'>
            <RowsPhotoAlbum photos={images} targetRowHeight={250} onClick={({ index: current }) => setIndex(current)} />

            <Lightbox index={index} slides={images} open={index >= 0} close={() => setIndex(-1)} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
