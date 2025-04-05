import { DefaultLayout } from 'layouts';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useMemo, useState } from 'react';
import { Photo, RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IApplicationState } from 'store';
import './Gallery.scss';

export const Gallery = () => {
  const { photos } = useSelector((state: IApplicationState) => state.global);
  const [index, setIndex] = useState(-1);

  const images = useMemo(() => {
    return photos.map(g => {
      return { src: g.thumbnail, width: g.width, height: g.height, url: g.url } as Photo;
    });
  }, [photos]);

  if (!images) return null;

  return (
    <>
      <DefaultLayout>
        <div className='siteCss' aria-hidden='true' aria-modal='true'>
          <div className='all_projects'>
            <h1>Gallery</h1>
            <ul className='p0 m0'>
              <li className='p0 m0'>
                <Link to='/projects/1'>{/* <img src={project1d1} alt='' /> */}</Link>
              </li>
            </ul>
            <RowsPhotoAlbum photos={images} targetRowHeight={250} onClick={({ index: current }) => setIndex(current)} />

            <Lightbox index={index} slides={images} open={index >= 0} close={() => setIndex(-1)} />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};
