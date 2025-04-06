import our_work_living_room from 'assets/images/why_choose/our_work_living_room.jpg';
import { DefaultLayout } from 'layouts';
import { BannerList } from 'components';

export const About = () => {
  return (
    <DefaultLayout>
      {/* Banner Start */}
      <BannerList text='About Us' isHideAnimation={true} />
      {/* End */}

      <div className='siteCssWidth1200'>
        <div className='offer_to_client marginTop50'>
          <div className='inner'>
            <h1 className='header1'>About Us</h1>

            <p className='para'>
              PanacheWorld provides one-stop interior design and renovation services for residential and commercial projects in India. With the aim of providing the most satisfactory design for
              clients to enjoy their lives, we will take into consideration our client’s needs, preferences and living habits. With this information, we’ll work together with each client, giving them
              professional advice and helping them create their ideal house.
            </p>

            <p className='para'>
              Welcome to PanacheWorld, where innovation meets artistry in interior design. Our passion for creating beautiful, functional spaces is at the heart of everything we do. Founded by a team
              of experienced designers, we have dedicated ourselves to transforming environments into personalized havens that reflect individual style and enhance everyday living.
            </p>

            <h3 className='header3'>Our Philosophy</h3>

            <p className='para'>
              At PanacheWorld, we believe that good design goes beyond aesthetics. It shapes the way we feel and interact with our surroundings. Our philosophy centers on the idea that each space
              should be a true reflection of the people who inhabit it. We take the time to understand your lifestyle, preferences, and needs, ensuring that every design decision aligns with your
              vision.
            </p>

            <h3 className='header3'>Our Team</h3>

            <p className='para'>
              Our team is comprised of talented designers, architects, and project managers who bring a wealth of knowledge and expertise to the table. With backgrounds in various design disciplines,
              we harness our collective creativity to deliver unique solutions tailored to each project. We are passionate about staying ahead of design trends while also honoring timeless principles
              of design.
            </p>

            <h3 className='header3'>Our Approach</h3>

            <p className='para'>
              We pride ourselves on our client-centric approach. From the initial consultation to the final reveal, we collaborate closely with you, fostering open communication and transparency. We
              utilize advanced design tools, including 3D visualization, to help you envision your space before implementation, ensuring that you are fully engaged in the decision-making process.
            </p>

            <h3 className='header3'>Our Commitment to Excellence</h3>

            <p className='para'>
              Excellence is our standard. We are dedicated to delivering high-quality workmanship, attention to detail, and innovative design solutions. Our commitment extends to sustainable
              practices, as we strive to incorporate eco-friendly materials and energy-efficient solutions in our projects. We believe in creating spaces that are not only beautiful but also
              responsible.
            </p>

            <h3 className='header3'>Join Us on This Journey</h3>

            <p className='para'>
              Whether you are looking to redesign your home, create an inspiring office environment, or refresh a commercial space, PanacheWorld is here to help. We invite you to join us on this
              exciting journey of transformation. Let us help you turn your vision into reality, creating a space that brings joy, comfort, and style to your everyday life.
            </p>

            <p className='para'>Thank you for considering PanacheWorld for your interior design needs. Together, let’s create spaces that inspire!</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='siteCssWidth1200'>
        <div className='why_choose_us marginBottom100'>
          <div className='box marginTop50'>
            <div className='text'>
              <h3 className='header3'>various features</h3>
              <p className='para'>
                In the world I notice persons are nearly always stressed and have no ds and houses and playgrounds and stores, so there&apos;s only a little time... I don&apos;t know how persons with
                jobs do the jobs and all the living as well...I guess the time gets spread very thin like butter all over the world, the roa
              </p>

              <div className='about-box-list'>
                <p className='para'>Interior Design</p>
                <div className='container'>
                  <div className='progress-bar' style={{ width: '65%' }}>
                    <span className='text'></span>
                    <span className='percent'>65%</span>
                  </div>
                </div>
              </div>

              <div className='about-box-list'>
                <p className='para'>Architecture Design</p>
                <div className='container'>
                  <div className='progress-bar' style={{ width: '79%' }}>
                    <span className='text'></span>
                    <span className='percent'>79%</span>
                  </div>
                </div>
              </div>

              <div className='about-box-list'>
                <p className='para'>Concept Design</p>
                <div className='container'>
                  <div className='progress-bar' style={{ width: '91%' }}>
                    <span className='text'></span>
                    <span className='percent'>91%</span>
                  </div>
                </div>
              </div>

              <div className='about-box-list'>
                <p className='para'>Modern Design</p>
                <div className='container'>
                  <div className='progress-bar' style={{ width: '70%' }}>
                    <span className='text'></span>
                    <span className='percent'>70%</span>
                  </div>
                </div>
              </div>

              <div className='about-box-list'>
                <p className='para'>Natural Material</p>
                <div className='container'>
                  <div className='progress-bar' style={{ width: '87%' }}>
                    <span className='text'></span>
                    <span className='percent'>87%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='image'>
              <img alt='our work living room' src={our_work_living_room} />
            </div>
          </div>
        </div>
      </div>
      {/* End */}
    </DefaultLayout>
  );
};
