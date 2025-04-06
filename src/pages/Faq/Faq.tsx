import { DefaultLayout } from 'layouts';
import { BannerList } from 'components';

export const Faq = () => {
  return (
    <DefaultLayout>
      {/* Banner Start */}
      <BannerList text='AFrequently Asked Questions (FAQ)' isHideAnimation={true} />
      {/* End */}

      <div className='siteCssWidth1200'>
        <div className='offer_to_client marginTop50 marginBottom100'>
          <div className='inner'>
            <h1 className='header1'>Frequently Asked Questions (FAQ)</h1>

            <h3 className='header3'>What types of projects does PanacheWorld specialize in?</h3>

            <p className='para'>
              We specialize in both residential and commercial interior design projects. From cozy homes and apartments to vibrant offices, retail spaces, and restaurants, we cater to a variety of
              environments while ensuring each space reflects the client&apos;s unique style.
            </p>

            <h3 className='header3'>How does the design process work?</h3>

            <p className='para'>
              Our design process typically involves several stages: initial consultation, concept development, design presentation, and implementation. We start by understanding your needs and
              preferences, followed by creating design concepts and layouts for your review. Once approved, we oversee the implementation of the design.
            </p>

            <h3 className='header3'>Do you offer 3D visualization services?</h3>

            <p className='para'>
              Yes, we provide 3D visualization services to help you visualize your space before implementation. This allows you to see the proposed designs, materials, and layouts, making it easier to
              make decisions about your project.
            </p>

            <h3 className='header3'>How long does a typical project take?</h3>

            <p className='para'>
              The duration of a project can vary greatly depending on its scope and complexity. Smaller residential projects may take a few weeks, while larger commercial designs can take several
              months. We will provide you with a timeline during the initial consultation.
            </p>

            <h3 className='header3'>Can you work with a specific budget?</h3>

            <p className='para'>
              Absolutely! We understand that budget is a crucial factor in any project. During our initial consultation, we will discuss your budget to ensure that our design solutions remain within
              your financial parameters while still delivering quality and style.
            </p>

            <h3 className='header3'>Are your designs customizable?</h3>

            <p className='para'>
              Yes, all our designs are fully customizable. We prioritize your preferences and lifestyle, ensuring that the final design is a true reflection of your vision and requirements.
            </p>

            <h3 className='header3'>Do you offer sustainable design options?</h3>

            <p className='para'>
              Yes, we are committed to sustainable design practices. We incorporate eco-friendly materials and energy-efficient solutions in our designs, allowing you to create a beautiful space while
              being environmentally responsible.
            </p>

            <h3 className='header3'>How do I get started with PanacheWorld?</h3>

            <p className='para'>
              Getting started is easy! Simply contact us through our website or give us a call to schedule an initial consultation. We will discuss your project, answer any questions you may have, and
              outline the next steps.
            </p>

            <h3 className='header3'>Can I see your previous work?</h3>

            <p className='para'>Yes, we invite you to explore our portfolio on our website. It showcases a variety of our completed projects, highlighting our design range and creativity.</p>

            <p className='para'>Thank you for considering PanacheWorld for your interior design needs. Together, let’s create spaces that inspire!</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
