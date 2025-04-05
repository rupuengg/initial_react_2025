/* eslint-disable @typescript-eslint/no-require-imports */
import { IOffer } from 'models/Offer';
import React, { useState } from 'react';
import './OfferItem.scss';

export interface IOfferItemProps {
  offer: IOffer;
}

export const OfferItem: React.FC<IOfferItemProps> = ({ offer }) => {
  const [currentOption, setCurrentOption] = useState(0);

  const getHeader = () => {
    return (
      <>
        <section>
          <img src={require('assets/images/' + offer.floor_image)} alt='2bhk interiors' />
        </section>
        <figcaption>
          <h2 className='header2'>{offer.title.toUpperCase()}</h2>
          <h3 className='header3'>
            {offer.price}
            <sup>*</sup>
          </h3>
          {/* <p>Inclusive of taxes</p> */}
        </figcaption>
      </>
    );
  };

  const getLeftNav = () => {
    return (
      <nav className='navBar'>
        {offer.options.map((option, index) => (
          <p
            key={`list-${index}`}
            className={currentOption === index ? 'para active' : 'para'}
            onClick={() => setCurrentOption(index)}
            style={{ backgroundImage: currentOption === index ? `url("${require('../../assets/images/offer/active.png')}")` : 'none' }}
          >
            {option.title}
          </p>
        ))}
      </nav>
    );
  };

  const getRightContent = () => {
    const { title, img, items } = offer.options[currentOption];

    return (
      <article className='rightbox' style={{ display: 'block' }}>
        <img alt='Modular kitchen' src={require('assets/images/' + img)} />
        <hr />
        <h3 className='header3'>{title}</h3>
        <ul>
          {items.map((item, index) => (
            <li key={`item-${index}`}>{item}</li>
          ))}
        </ul>
      </article>
    );
  };

  return (
    <figure className='offer'>
      {getHeader()}
      <div className='clear'></div>
      <aside>
        <div className='w-full'>
          <aside className='flex'>
            {getLeftNav()}
            <section className='w-1/2'>{getRightContent()}</section>
          </aside>
        </div>
      </aside>
    </figure>
  );
};
