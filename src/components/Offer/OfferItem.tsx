import { IKImage } from 'imagekitio-react';
import React, { useState } from 'react';
import { IOffer, IOfferItem } from 'entities';

export interface IOfferItemProps {
  offer: IOffer;
  selected: IOfferItem;
}

export const OfferItem: React.FC<IOfferItemProps> = ({ offer, selected }) => {
  const [currentOption, setCurrentOption] = useState<IOfferItem>(selected);

  const getHeader = () => {
    return (
      <>
        <section>
          <IKImage title={offer.title} alt={offer.title} urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path={`assets/${offer.floor_image}`} />
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
            className={currentOption.title === option.title ? 'active' : ''}
            onClick={() => setCurrentOption(option)}
            style={{ backgroundImage: currentOption.title === option.title ? `url("https://ik.imagekit.io/yz7i3lbbn/assets/offer/active.png")` : 'none' }}
          >
            {option.title}
          </p>
        ))}
      </nav>
    );
  };

  const getRightContent = () => {
    return (
      <section className='w-1/2'>
        {offer.options.map(option => (
          <article key={option.title} className='rightbox' style={{ display: currentOption.title === option.title ? 'block' : 'none' }}>
            <IKImage title={option.title} alt={option.title} urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path={`assets/${option.img}`} />
            <hr />
            <h3 className='header3'>{option.title}</h3>
            <ul>{option.items?.map((item, index) => <li key={`item-${index}`}>{item}</li>)}</ul>
          </article>
        ))}
      </section>
    );
    // return (
    //   <section className='w-1/2'>
    //     {offer.options.map(({ title, img, items }) => {
    //       <article key={title} className='rightbox' style={{ display: currentOption.title === title ? 'block' : 'none' }}>
    //         <IKImage title={title} alt={title} urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path={`assets/${img}`} />
    //         <hr />
    //         <h3 className='header3'>{title}</h3>
    //         <ul>{items?.map((item, index) => <li key={`item-${index}`}>{item}</li>)}</ul>
    //       </article>;
    //     })}
    //   </section>
    // );
  };

  console.log('currentOption', currentOption);
  return (
    <figure className='offer'>
      {getHeader()}
      <div className='clear'></div>
      <aside>
        <div className='w-full'>
          <aside className='flex'>
            {getLeftNav()}
            {getRightContent()}
          </aside>
        </div>
      </aside>
    </figure>
  );
};
