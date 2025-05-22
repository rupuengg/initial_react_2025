import { DefaultLayout } from 'layouts';
import { defaultEntityStatusDataEntity } from 'mock';
import 'yet-another-react-lightbox/styles.css';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Photo, RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IEntityStatusDataEntity } from 'entities';
import { E_Data_Load_Status } from 'enums';
import { IApplicationState, IUseDispatch, getJsonAllGallery, useAppDispatch } from 'store';

export const Project = () => {
  const { galleries } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  const startRef = useRef<IEntityStatusDataEntity>(defaultEntityStatusDataEntity);
  const navigate = useNavigate();

  useEffect(() => {
    if (startRef.current.getAllGalleries === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, getAllGalleries: E_Data_Load_Status.PENDING };
      // dispatch(getAllGallery());
      dispatch(getJsonAllGallery());
    }
  }, [dispatch]);

  const images = useMemo(() => {
    return (
      galleries
        // .filter(p => p.customMetadata && typeof p.customMetadata.cover === 'boolean' && p.customMetadata.cover)
        .map(g => {
          return { src: g.galleryCover.url, width: Number(g.galleryCover.width), height: Number(g.galleryCover.height), url: g.galleryCover.url, key: g.galleryCover.fileId } as Photo;
        })
    );
  }, [galleries]);

  const handleClick = useCallback(
    (d: any) => {
      const photo = galleries.find(p => p.galleryCover.fileId === d.photo.key);
      if (photo) navigate(`/project_done_by_us/${photo.galleryId || ''}`);
    },
    [galleries, navigate]
  );

  if (!images) return null;

  return (
    <DefaultLayout>
      <div className='siteCss'>
        <div className='project_page marginBottom100'>
          <h1 id='/projects' className='header1'>
            Our Projects
          </h1>
          <div className='marginTop50'>
            <RowsPhotoAlbum photos={images} targetRowHeight={600} onClick={handleClick} />

            {/* <Lightbox index={index} slides={images} open={index >= 0} close={() => setIndex(-1)} />

            <Lightbox
              render={{
                slide: ({ slide, rect }) => {
                  const width = slide.width && slide.height ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width)) : rect.width;

                  const height = slide.width && slide.height ? Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height)) : rect.height;

                  return <Navigate to={`/home`} replace />;
                },
              }}
            /> */}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
