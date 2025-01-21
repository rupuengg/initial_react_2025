import './Offer.scss';
import { OfferItem } from './OfferItem';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'store';

export const Offer = () => {
  const { offers } = useSelector((state: IApplicationState) => state.global);

  return (
    <div className='offers'>
      <div className='siteCss'>
        <article className='article'>
          {offers.map((offer, index) => (
            <OfferItem key={`list-${index}`} offer={offer} />
          ))}
        </article>
      </div>
    </div>
  );
};
