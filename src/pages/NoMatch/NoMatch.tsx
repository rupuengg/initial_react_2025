import './NoMatch.scss';
import { Footer, Header } from 'pages/Common';
import { Link } from 'react-router-dom';

export const NoMatch = () => {
  return (
    <>
      <Header />
      <div className='noMatch'>
        <div className='siteCss'>
          <div className='content'>
            This page is currently is in progress.
            <br />
            <br />
            <br />
            <br />
            <br />
            <Link to='/home'>Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
