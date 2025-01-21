import './Enquiry.scss';

export const Enquiry = () => {
  return (
    <div className='enquire'>
      <div className='siteCss'>
        <div className='formBox'>
          <h1>Enquire for services</h1>
          <div className='formItem'>
            <label>Name</label>
            <input name='' />
          </div>
          <div className='formItem'>
            <label>Phone no</label>
            <input name='' />
          </div>
          <div className='formItem'>
            <label>Email</label>
            <input name='' />
          </div>
          <div className='formItem'>
            <label>Query</label>
            <input name='' />
          </div>
          <div className='formItem'>
            <button type='submit'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
