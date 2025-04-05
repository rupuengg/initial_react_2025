import IslandResort_interiordesign_after from '../../assets/images/about/IslandResort_interiordesign_after.jpg';
import { DefaultLayout } from 'layouts';
import './Services.scss';

export const Services = () => {
  return (
    <DefaultLayout>
      <div className='siteCss' aria-hidden='true' aria-modal='true'>
        <div className='all_projects'>
          <h1>Services</h1>
          <p>
            PanacheWorld provides one-stop interior design and renovation services for residential and commercial projects in India. With the aim of providing the most satisfactory design for clients
            to enjoy their lives, we will take into consideration our client’s needs, preferences and living habits. With this information, we’ll work together with each client, giving them
            professional advice and helping them create their ideal house.
          </p>
          <img src={IslandResort_interiordesign_after} alt='2bhk interiors' />
        </div>
      </div>
    </DefaultLayout>
  );
};
