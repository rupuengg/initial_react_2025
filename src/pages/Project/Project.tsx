import { Footer, Header } from 'pages/Common';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Photo, RowsPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/rows.css';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { EMPTY_DATA_STATUS_ENTITY, E_Data_Load_Status, IApplicationState, IDataStatus, IUseDispatch, getAllGallery, useAppDispatch } from 'store';
import './Project.scss';

export const Project = () => {
  const { galleries } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  // const navigate = useNavigate();
  const startRef = useRef<IDataStatus>(EMPTY_DATA_STATUS_ENTITY);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    if (startRef.current.loadAllPhotos === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, loadAllPhotos: E_Data_Load_Status.PENDING };
      dispatch(getAllGallery());
    }
  }, [dispatch]);

  const images = useMemo(() => {
    return galleries.map(g => {
      return { src: g.url, width: g.width, height: g.height, url: g.url } as Photo;
    });
  }, [galleries]);

  if (!images) return null;

  return (
    <>
      <Header />
      <div className='siteCss' aria-hidden='true' aria-modal='true'>
        <div className='all_projects'>
          <h1>Gallery</h1>
          <ul className='p0 m0'>
            <li className='p0 m0'>
              <Link to='/projects/1'>{/* <img src={project1d1} alt='' /> */}</Link>
            </li>
          </ul>
          <RowsPhotoAlbum photos={images} targetRowHeight={400} onClick={({ index: current }) => setIndex(current)} />

          <Lightbox index={index} slides={images} open={index >= 0} close={() => setIndex(-1)} />

          <Lightbox
            render={{
              slide: ({ slide, rect }) => {
                const width = slide.width && slide.height ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width)) : rect.width;

                const height = slide.width && slide.height ? Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height)) : rect.height;

                console.log(width, height);
                return <Navigate to={`/home`} replace />;
              },
            }}
            // ...
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
