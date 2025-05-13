import { DefaultLayout } from 'layouts';
import { defaultEntityStatusDataEntity } from 'mock';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Photo, RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { useSelector } from 'react-redux';
import { IEntityStatusDataEntity } from 'entities';
import { E_Data_Load_Status } from 'enums';
import { IApplicationState, IUseDispatch, getAllPhotos, useAppDispatch } from 'store';

export const Gallery = () => {
  const { galleries, photos } = useSelector((state: IApplicationState) => state.global);
  const startRef = useRef<IEntityStatusDataEntity>(defaultEntityStatusDataEntity);
  const dispatch: IUseDispatch = useAppDispatch();
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (galleries && galleries.length > 0 && photos.length === 0 && startRef.current.allPhotos === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, allPhotos: E_Data_Load_Status.PENDING };
      dispatch(getAllPhotos());
    }
  }, [galleries, dispatch]);

  const images = useMemo(() => {
    return photos.map(g => {
      return { src: g.url, width: Number(g.width), height: Number(g.height), url: g.url } as Photo;
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
