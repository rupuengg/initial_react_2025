import { IKContext, IKVideo } from 'imagekitio-react';
import { DefaultLayout } from 'layouts';
import { IGallery } from 'models';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useMemo, useState } from 'react';
import { Photo, RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PhotoUtils } from 'utils';
import { IApplicationState } from 'store';
import './Project.scss';

export const ProjectPhoto = () => {
  const { photos } = useSelector((state: IApplicationState) => state.global);
  const params = useParams();
  const [index, setIndex] = useState(-1);

  // useEffect(() => {
  //   if (startRef.current.loadAllPhotos === E_Data_Load_Status.NOT_YET_STARTED) {
  //     startRef.current = { ...startRef.current, loadAllPhotos: E_Data_Load_Status.PENDING };
  //     dispatch(getGalleryPhotos(params.id || ''));
  //   }
  // }, [params.id, dispatch]);

  const gallery: IGallery | undefined | null = useMemo(() => {
    const galleries: { [x: string]: IGallery } = {};

    if (photos && params.id) {
      const d = photos.find(p => p.customMetadata?.galleryId === params.id);
      const photo = photos.find(p => p.fileId === d?.fileId);
      if (photo) {
        const photoAr: string[] | undefined = photo?.filePath?.split('/');

        photos.forEach(p => {
          const ar: string[] | undefined = p?.filePath?.split('/');
          if (ar && ar[1]) {
            const categoryKey: string = ar[1];

            if (galleries[categoryKey]) galleries[categoryKey]?.photos?.push(p);
            else {
              galleries[categoryKey] = {
                type: p.type,
                name: ar[1],
                url: p.url,
                thumbnail: p.thumbnail,
                fileType: p.fileType,
                filePath: p.filePath,
                photos: [p],
                width: Number(p.width),
                height: Number(p.height),
              };
            }

            if (p.customMetadata && p.customMetadata.cover) {
              galleries[categoryKey].type = p.type;
              galleries[categoryKey].url = p.url;
              galleries[categoryKey].thumbnail = p.thumbnail;
              galleries[categoryKey].fileType = p.fileType;
              galleries[categoryKey].filePath = p.filePath;
            }
          }
        });

        return photoAr && photoAr[1] && galleries[photoAr[1]] ? galleries[photoAr[1]] : null;
      }
    }
    return undefined;
  }, [photos, params.id]);

  const images = useMemo(() => {
    return PhotoUtils(gallery?.photos?.filter(p => p.audioCodec !== 'aac'))
      .sort()
      ?.map(g => {
        return { src: g.url, width: Number(g.width), height: Number(g.height), url: g.url } as Photo;
      });
  }, [gallery?.photos]);

  const video = useMemo(() => PhotoUtils(gallery?.photos).getVideo(), [gallery?.photos]);

  if (!images) return null;

  return (
    <DefaultLayout>
      <div className='siteCss'>
        <div className='gallery_page marginBottom100'>
          <h1 id='/projects' className='header1'>
            Project Gallery
          </h1>
          {video && (
            <div className='p0 m0 marginTop50 video-box'>
              <IKContext urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn'}>
                <IKVideo className='ikvideo-default' path={video.filePath || ''} controls={true} />
              </IKContext>
            </div>
          )}
          <div className='p0 m0 marginTop50'>
            <RowsPhotoAlbum photos={images} targetRowHeight={550} onClick={({ index: current }) => setIndex(current)} />

            <Lightbox index={index} slides={images} open={index >= 0} close={() => setIndex(-1)} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
