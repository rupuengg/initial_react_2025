import './Enquiry.scss';

export const Enquiry = () => {
  return (
    <div className='siteCssWidth1200'>
      <div className='enquire marginTop100 marginBottom100'>
        <div className='formBox'>
          <h1 className='header1'>Enquire for services</h1>
          <div className='formItem marginTop20'>
            <label>Name</label>
            <div className='box'>
              <input name='' />
            </div>
          </div>
          <div className='formItem marginTop20'>
            <label>Phone no</label>
            <div className='box'>
              <input name='' />
            </div>
          </div>
          <div className='formItem marginTop20'>
            <label>Email</label>
            <div className='box'>
              <input name='' />
            </div>
          </div>
          <div className='formItem marginTop20'>
            <label>Query</label>
            <div className='box'>
              <input name='' />
            </div>
          </div>
          <div className='formItem marginTop20'>
            <div className='box button'>
              <button type='submit'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
