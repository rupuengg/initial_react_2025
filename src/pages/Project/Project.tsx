import { DefaultLayout } from 'layouts';
import 'yet-another-react-lightbox/styles.css';
import { useCallback, useMemo } from 'react';
import { Photo, RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IApplicationState } from 'store';
import './Project.scss';

export const Project = () => {
  const { photos } = useSelector((state: IApplicationState) => state.global);
  const navigate = useNavigate();

  const images = useMemo(() => {
    return photos
      .filter(p => p.customMetadata && typeof p.customMetadata.cover === 'boolean' && p.customMetadata.cover)
      .map(g => {
        return { src: g.url, width: Number(g.width), height: Number(g.height), url: g.url, key: g.fileId } as Photo;
      });
  }, [photos]);

  const handleClick = useCallback(
    (d: any) => {
      const photo = photos.find(p => p.fileId === d.photo.key);
      if (photo) navigate(`/project_done_by_us/${photo.customMetadata?.galleryId || ''}`);
    },
    [photos, navigate]
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
