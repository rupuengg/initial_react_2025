import { DefaultLayout } from 'layouts';
import { Link } from 'react-router-dom';

export const NoMatch = () => {
  return (
    <DefaultLayout>
      <div className='siteCssWidth1200'>
        <div className='noMatch marginTop100'>
          <div className='content'>
            <h1 className='header1'>This page is currently is in progress.</h1>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Link className='link' to='/'>
              Home
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
