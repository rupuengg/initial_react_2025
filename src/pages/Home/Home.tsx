// import project1d1 from '../../../assets/images/projects/1/designer_images/001-mb-tv-wr.jpeg';
import './Home.scss';
import { Footer, Header } from 'pages/Common';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { EMPTY_DATA_STATUS_ENTITY, E_Data_Load_Status, IDataStatus, IUseDispatch, getAllPhotos, useAppDispatch } from 'store';
import { BannerList, Enquiry, Offer } from 'components';

export const Home = () => {
  const dispatch: IUseDispatch = useAppDispatch();
  const startRef = useRef<IDataStatus>(EMPTY_DATA_STATUS_ENTITY);

  useEffect(() => {
    if (startRef.current.loadAllPhotos === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, loadAllPhotos: E_Data_Load_Status.PENDING };
      dispatch(getAllPhotos());
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <BannerList />
      <Offer />
      <div className='siteCss'>
        <div className='all_projects'>
          <h1>All Projects</h1>
          <ul className='p0 m0'>
            <li className='p0 m0'>
              <Link to='/projects/1'>{/* <img src={project1d1} alt='' /> */}</Link>
            </li>
          </ul>
        </div>
      </div>
      <Enquiry />
      <Footer />
    </>
  );
};
