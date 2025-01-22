import { Footer, Header } from 'pages/Common';
import { Link } from 'react-router-dom';
import './Home.scss';

export const Gallery = () => {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};
