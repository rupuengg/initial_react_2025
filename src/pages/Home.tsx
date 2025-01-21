// import project1d1 from '../../../assets/images/projects/1/designer_images/001-mb-tv-wr.jpeg';
import './Home.scss';
import { Footer, Header } from 'pages/Common';
import { Link } from 'react-router-dom';
import { BannerList, Enquiry, Offer } from 'components';

const Home = () => {
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

export default Home;
