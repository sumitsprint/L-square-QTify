// src/components/Carousel/Carousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import leftArrow from "../../assets/left.png";
import rightArrow from "../../assets/right.png";
import styles from "./Carousel.module.css";

export default function Carousel({ children }) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: `.${styles.next}`,
        prevEl: `.${styles.prev}`,
      }}
      spaceBetween={20}
      breakpoints={{
        320: { slidesPerView: 1 },    // mobile
        640: { slidesPerView: 2 },    // small tablets
        1024: { slidesPerView: 3 },   // desktop
        1280: { slidesPerView: 4 },   // large screens (max 4 per view)
      }}
    >
      {/* Slides */}
      {children.map((child, idx) => (
        <SwiperSlide key={idx}>{child}</SwiperSlide>
      ))}

      {/* Navigation buttons */}
      <button className={`${styles.nav} ${styles.prev}`} aria-label="Previous">
        <img src={leftArrow} alt="Previous" />
      </button>
      <button className={`${styles.nav} ${styles.next}`} aria-label="Next">
        <img src={rightArrow} alt="Next" />
      </button>
    </Swiper>
  );
}
