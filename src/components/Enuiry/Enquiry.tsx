import { defaultContactInfo } from 'mock';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IContactInfoEntity } from 'entities';
import { useTableMapper } from 'hooks';
import { GlobalActions, IApplicationState, IUseDispatch, saveData, useAppDispatch } from 'store';

export const Enquiry = () => {
  const { isContactFormSubmit } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  const [contactForm, setContactForm] = useState<IContactInfoEntity>(defaultContactInfo);

  const { mapper } = useTableMapper('contactInfo');

  useEffect(() => {
    if (isContactFormSubmit) {
      setContactForm({ ...defaultContactInfo });
      setTimeout(() => {
        dispatch(GlobalActions.resetContactForm());
      }, 2000);
    }
  }, [isContactFormSubmit, dispatch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget) setContactForm(p => ({ ...p, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dispatch(saveData({ ...mapper, data: contactForm }));
    },
    [contactForm, mapper, dispatch]
  );

  return (
    <div className='siteCssWidth1200'>
      <div className='enquire marginTop100 marginBottom100'>
        <div className='form-layouts'>
          <h1 className='header1'>Enquire for services</h1>
          {isContactFormSubmit && <p className='success'>Your request has been sent</p>}
          <div className='form-field marginTop20'>
            <label>Name</label>
            <div className='field-box'>
              <input name='name' value={contactForm.name} onChange={handleChange} />
            </div>
          </div>
          <div className='form-field marginTop20'>
            <label>Phone no</label>
            <div className='field-box'>
              <input name='phone' value={contactForm.phone} onChange={handleChange} />
            </div>
          </div>
          <div className='form-field marginTop20'>
            <label>Email</label>
            <div className='field-box'>
              <input name='email' value={contactForm.email} onChange={handleChange} />
            </div>
          </div>
          <div className='form-field marginTop20'>
            <label>Query</label>
            <div className='field-box'>
              <input name='query' value={contactForm.query} onChange={handleChange} />
            </div>
          </div>
          <div className='form-field marginTop20'>
            <div className='button'>
              <button type='button' onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
