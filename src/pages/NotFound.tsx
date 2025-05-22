import { DefaultLayout } from 'layouts';

export const NotFound = () => {
  return (
    <DefaultLayout>
      <div className='siteCssWidth1200'>
        <div className='noMatch marginTop100'>
          <div className='content'>
            <h1 className='header1'>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
