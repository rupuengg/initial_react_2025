import defaultUser from 'assets/images/testimonial/default.svg';
import kitchen_left from 'assets/images/why_choose/kitchen_left.jpg';
import kitchen_right from 'assets/images/why_choose/kitchen_right.jpg';
import living_area from 'assets/images/why_choose/living_area.jpg';
import our_work_living_room from 'assets/images/why_choose/our_work_living_room.jpg';
import { IKImage } from 'imagekitio-react';
import { DefaultLayout } from 'layouts';
import { useCallback, useMemo } from 'react';
import { Photo, RowsPhotoAlbum } from 'react-photo-album';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ITestimonialEntity } from 'entities';
import { IApplicationState } from 'store';
import { CustomSlider, Enquiry, OfferItem } from 'components';

export const Home = () => {
  const { banners, galleries, offers, testimonial } = useSelector((state: IApplicationState) => state.global);
  const navigate = useNavigate();

  const projects = useMemo(() => galleries.map(g => ({ src: g.url || '', width: g.width, height: g.height, url: g.url || '' }) as Photo), [galleries]);

  const handleClick = useCallback(() => {
    navigate('/project_done_by_us/043_110_aditya_dhurav_apartment_delhi_done');
  }, [navigate]);

  return (
    <DefaultLayout>
      {/* Slider */}
      <CustomSlider items={banners.map(b => ({ image: b.img, title: b.txt }))} />
      {/* Slider End */}

      {/* We Offer to Client Section */}
      <div className='siteCssWidth1200'>
        <div className='offer_to_client marginTop100'>
          <div className='inner'>
            <div className='above_box'>
              <h1 className='header1'>Best Interior Designer In Noida</h1>
              <p className='para'>
                PanacheWorld is a one-stop solution for all your interior design needs in Noida. We are a highly appreciated group of exceptional interior designers in Noida, dedicated to providing
                interior design services in Noida, Greater Noida, and Ghaziabad. Our expert designers are renowned for their ability to create stunning designs and layouts that seamlessly align with
                your lifestyle.
              </p>
              <p className='para'>
                PanacheWorld Designs has consistently delivered exceptional interior design. Whether you require design solutions for residential, office, commercial, or luxury spaces, interior
                designers in Noida are here to fulfil your requirements. Look no further, as you have found the most reliable interior design firm in Noida with us.
              </p>
              <h2 id='/home' className='header2'>
                what we offer to our clients
              </h2>
              <p className='para'>
                We offers custom interiors in Noida, <br />
                space planning, styling, sustainable design, <br />
                and expert consultations.
              </p>
            </div>
            <div className='lower_box marginTop30'>
              <div className='box'>
                <h3 className='header3'>Interior Design</h3>
                <div>
                  <div className='pagelayer-service-text'>
                    <p className='para'>Interior design enhances spaces through color, texture, lighting, and layout for beauty and function.</p>
                  </div>
                  <NavLink to={'/all_photos'} className={'link'} onClick={() => {}}>
                    More
                  </NavLink>
                </div>
              </div>
              <div className='box'>
                <h3 className='header3'>Space Planning</h3>
                <div>
                  <div className='pagelayer-service-text'>
                    <p className='para'>Efficient space planning is crucial for maximizing your area’s potential</p>
                  </div>
                  <NavLink to={'/all_photos'} className={'link'} onClick={() => {}}>
                    More
                  </NavLink>
                </div>
              </div>
              <div className='box'>
                <h3 className='header3'>Sustainable Design</h3>
                <div>
                  <div className='pagelayer-service-text'>
                    <p className='para'>We are committed to sustainability and eco-friendly practices</p>
                  </div>
                  <NavLink to={'/all_photos'} className={'link'} onClick={() => {}}>
                    More
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End */}

      {/* Why Choose Us */}
      <div className='siteCssWidth1200'>
        <div className='why_choose_us marginTop100'>
          <h2 className='header2'>why choose us</h2>
          <div className='box marginTop50'>
            <div className='text'>
              <h3 className='header3'>our work living room</h3>
              <p className='para'>
                In the world I notice persons are nearly always stressed and have no ds and houses and playgrounds and stores, so there&apos;s only a little time... I don&apos;t know how persons with
                jobs do the jobs and all the living as well...I guess the time gets spread very thin like butter all over the world, the roa
              </p>
            </div>
            <div className='image'>
              <img alt='our work living room' src={our_work_living_room} />
            </div>
          </div>
          <div className='box marginTop50'>
            <div className='image'>
              <img style={{ width: '50%' }} alt='our work living room' src={kitchen_left} />
              <img style={{ width: '50%' }} alt='our work living room' src={kitchen_right} />
            </div>
            <div className='text'>
              <h3 className='header3'>our kitchen</h3>
              <p className='para'>
                In the world I notice persons are nearly always stressed and have no ds and houses and playgrounds and stores, so there&apos;s only a little time... I don&apos;t know how persons with
                jobs do the jobs and all the living as well...I guess the time gets spread very thin like butter all over the world, the roa
              </p>
            </div>
          </div>
          <div className='box marginTop50'>
            <div className='text'>
              <h3 className='header3'>our work living room</h3>
              <p className='para'>
                In the world I notice persons are nearly always stressed and have no ds and houses and playgrounds and stores, so there&apos;s only a little time... I don&apos;t know how persons with
                jobs do the jobs and all the living as well...I guess the time gets spread very thin like butter all over the world, the roa
              </p>
            </div>
            <div className='image'>
              <img alt='our work living room' src={living_area} />
            </div>
          </div>
        </div>
      </div>
      {/* End */}

      {/* Offer Section */}
      <div className='siteCssWidth1200'>
        <div className='offers marginTop100'>
          <h2 className='header2'>Our Basic Plan</h2>

          <article className='article'>
            {offers.map((offer, index) => (
              <OfferItem key={`list-${index}`} offer={offer} />
            ))}
          </article>
        </div>
      </div>
      {/* End */}

      {/* Projects */}
      <div className='siteCssFullWidth'>
        <div className='our_work_may_impress marginTop100'>
          <RowsPhotoAlbum photos={projects} targetRowHeight={400} onClick={handleClick} />
          <h2 className='header2'>our works may impress you</h2>

          <div className='box marginTop50'>
            <div className='column'>
              <a href='/project_done_by_us/000_f_142_gulshan_bellina_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='000%20-%20F%20142%20Gulshan%20Bellina%20-%20Done/003-mb-b-fw.1aad6ffb.jpeg' />
              </a>
              <a href='/project_done_by_us/043_110_aditya_dhurav_apartment_delhi_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='043%20-%20110%20-%20Aditya%20-%20Dhurav%20Apartment%20Delhi%20-%20Done/IMG-20221104-WA0014.jpg' />
              </a>
              <a href='/project_done_by_us/013_g_ajay_1004_samridhi_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='013%20-%20G%20-%20Ajay%20-%201004%20-%20Samridhi%20-%20Done/IMG-20220322-WA0005.jpg' />
              </a>
              <a href='/project_done_by_us/016_f_044_gulshan_bellina_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='016%20-%20F%20-%20044%20-%20Gulshan%20Bellina%20-%20Done/IMG-20211114-WA0106.jpg' />
              </a>
            </div>
            <div className='column'>
              <a href='/project_done_by_us/043_110_aditya_dhurav_apartment_delhi_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='043%20-%20110%20-%20Aditya%20-%20Dhurav%20Apartment%20Delhi%20-%20Done/IMG-20221104-WA0033.jpg' />
              </a>
              <a href='/project_done_by_us/_183_gulshan_bellina_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='029%20-%20A-%20183%20-%20Gulshan%20Bellina%20-%20Done/IMG_20220311_130805.jpg' />
              </a>
              <a href='/project_done_by_us/013_g_ajay_1004_samridhi_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='013%20-%20G%20-%20Ajay%20-%201004%20-%20Samridhi%20-%20Done/IMG-20220322-WA0011.jpg' />
              </a>
              <a href='/project_done_by_us/034_g_3052_gaur_city_14_avenue'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='034%20-%20G%203052%20-%20Gaur%20City%2014%20Avenue/IMG_20220506_233115.jpg' />
              </a>
              <a href='/project_done_by_us/016_f_044_gulshan_bellina_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='016%20-%20F%20-%20044%20-%20Gulshan%20Bellina%20-%20Done/IMG_9055.JPG' />
              </a>
            </div>
            <div className='column'>
              <a href='/project_done_by_us/043_110_aditya_dhurav_apartment_delhi_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='043%20-%20110%20-%20Aditya%20-%20Dhurav%20Apartment%20Delhi%20-%20Done/IMG-20221104-WA0025.jpg' />
              </a>
              <a href='/project_done_by_us/043_110_aditya_dhurav_apartment_delhi_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='043%20-%20110%20-%20Aditya%20-%20Dhurav%20Apartment%20Delhi%20-%20Done/IMG-20221104-WA0018.jpg' />
              </a>
              <a href='/project_done_by_us/013_g_ajay_1004_samridhi_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='013%20-%20G%20-%20Ajay%20-%201004%20-%20Samridhi%20-%20Done/IMG-20220322-WA0010.jpg' />
              </a>
              <a href='/project_done_by_us/049_j_061_subodh_gulshan_bellina_done'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='049%20-%20J%20-%20061%20-%20Subodh%20-%20Gulshan%20Bellina%20-%20Done/IMG_20220914_194548862.jpg' />
              </a>
            </div>
          </div>

          <div className='marginTop50' style={{ textAlign: 'center' }}>
            <NavLink to={'/all_photos'} className={'link'} onClick={() => {}}>
              More
            </NavLink>
          </div>

          <ul className='p0 m0'>
            <li className='p0 m0'>
              <Link to='/projects/1'>{/* <img src={project1d1} alt='' /> */}</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* End */}

      {/* Featured Project */}
      <div className='siteCssFullWidth'>
        <div className='our_work_may_impress marginTop100'>
          <h2 className='header2'>featured project</h2>

          <div className='box marginTop50'>
            <div className='column'>
              <a href='/project_done_by_us/043_110_aditya_dhurav_apartment_delhi_done' title='This is featured project'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='043%20-%20110%20-%20Aditya%20-%20Dhurav%20Apartment%20Delhi%20-%20Done/IMG-20221104-WA0014.jpg' />
              </a>
              <a href='/project_done_by_us/043_110_aditya_dhurav_apartment_delhi_done' title='This is featured project'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='043%20-%20110%20-%20Aditya%20-%20Dhurav%20Apartment%20Delhi%20-%20Done/IMG-20221104-WA0018.jpg' />
              </a>
            </div>
            <div className='column'>
              <a href='/project_done_by_us/043_110_aditya_dhurav_apartment_delhi_done' title='This is featured project'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='043%20-%20110%20-%20Aditya%20-%20Dhurav%20Apartment%20Delhi%20-%20Done/IMG-20221104-WA0033.jpg' />
              </a>
            </div>
            <div className='column'>
              <a href='/project_done_by_us/043_110_aditya_dhurav_apartment_delhi_done' title='This is featured project'>
                <IKImage urlEndpoint={'https://ik.imagekit.io/yz7i3lbbn/'} path='043%20-%20110%20-%20Aditya%20-%20Dhurav%20Apartment%20Delhi%20-%20Done/IMG-20221104-WA0025.jpg' />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* End */}

      {/* Testimonial */}
      <div className='siteCssFullWidth'>
        <div className='testimonial marginTop100'>
          <h2 className='header2'>testimonial</h2>

          <div className='main-item marginTop50'>
            {testimonial
              .filter((item: ITestimonialEntity) => !item.isHide)
              .map((item: ITestimonialEntity, index: number) => (
                <div key={index} className='item-list'>
                  <div className='inner-box'>
                    <div className='img'></div>
                    <div className='content'>
                      <p className='para'>{item.text}</p>
                      <div className='img-box'>
                        <img alt={item.name} src={defaultUser} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* End */}

      {/* We Offer to Client Section */}
      <div className='siteCssWidth1200'>
        <div className='offer_to_client marginTop50'>
          <div className='inner'>
            <div className='above_box'>
              <h1 className='header1'>WE OFFER THE BEST SOLUTIONS</h1>
              <p className='para'>
                Our dedication towards our work and the trust of our esteemed clients have pushed us among the top interior designers in Noida, Ghaziabad, and Greater Noida. Here are some of the
                examples showing our great business relationship with the clients who have acquired our brilliant interior designing.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End */}

      {/* Enquirey */}
      <Enquiry />
      {/* End */}
    </DefaultLayout>
  );
};
