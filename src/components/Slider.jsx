import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Slider = ({ images }) => {
  const overlayColors = ['#e5432c', '#51ab36', '#7a72b1', '#f8c60d'];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      breakpoints={{
        768: {
          slidesPerView: 4,
        },
      }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="slide-item">
          <div className="image-wrapper">
            <img src={src} alt={`Slide ${index + 1}`} className="slider-image" />
            <div
              className="color-overlay"
              style={{ backgroundColor: overlayColors[index % overlayColors.length] }}
            ></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
