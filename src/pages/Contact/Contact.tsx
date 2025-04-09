import { DefaultLayout } from 'layouts';
import { BannerList, Enquiry } from 'components';

export const Contact = () => {
  return (
    <DefaultLayout>
      {/* Banner Start */}
      <BannerList text='AFrequently Asked Questions (FAQ)' isHideAnimation={true} />
      {/* End */}

      {/* Enquirey */}
      <Enquiry />
      {/* End */}
    </DefaultLayout>
  );
};
