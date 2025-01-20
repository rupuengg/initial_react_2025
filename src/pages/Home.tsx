import project1d1 from '../../../assets/images/projects/1/designer_images/001-mb-tv-wr.jpeg';
import BannerList from '../../Common/BannerList';
import Enquery from '../../Common/Enquery';
import Footer from '../../Common/Footer/Footer';
import Header from '../../Common/Header';
import OfferList from '../../Common/OfferList';
import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Header />
      <BannerList />
      <OfferList />
      <div className='siteCss'>
        <div className='all_projects'>
          <h1>All Projects</h1>
          <ul className='p0 m0'>
            <li className='p0 m0'>
              <Link to='/projects/1'>
                <img src={project1d1} alt='' />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Enquery />
      <Footer />
    </>
  );
};

export default Home;
