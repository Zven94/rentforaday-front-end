import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRightCircle } from 'react-icons/ai';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import {
  Autoplay, EffectFade, Navigation, Pagination,
} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import own styles.
import '../styles/Splash.css';

const Splash = () => (
  <>
    <h1 className="slideContent__title">Choose your next destination&apos;s accommodation.</h1>
    <Swiper
      className="splashSwiper"
      direction="vertical"
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      slidesPerView={1}
      allowTouchMove={false}
      loop
      pagination={{
        clickable: true,
      }}
    >
      <SwiperSlide>
        <div className="slideContent slide1">
          <Link to="/items" className="slideContent__link">
            See more
            {' '}
            <AiOutlineRightCircle />
            {' '}
          </Link>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slideContent slide2">
          <Link to="/items" className="slideContent__link">
            See more
            {' '}
            <AiOutlineRightCircle />
            {' '}
          </Link>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slideContent slide3">
          <Link to="/items" className="slideContent__link">
            See more
            {' '}
            <AiOutlineRightCircle />
            {' '}
          </Link>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="slideContent slide4">
          <Link to="/items" className="slideContent__link">
            See more
            {' '}
            <AiOutlineRightCircle />
            {' '}
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  </>
);

export default Splash;
