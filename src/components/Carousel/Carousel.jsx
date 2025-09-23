// src/components/Carousel/Carousel.jsx
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";

import leftImg from "../../assets/left.png";
import rightImg from "../../assets/right.png";

/**
 * Re-usable Carousel wrapper using Swiper.
 * - children: nodes (AlbumCard instances typically)
 * - breakpoints: optional responsive breakpoints
 */
export default function Carousel({
  children,
  slidesPerView = 4,
  breakpoints,
  spaceBetween = 18,
  navigation = true,
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  // for hiding/disabling nav at ends
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const defaultBreakpoints = {
    320: { slidesPerView: 1.25, spaceBetween: 12 },
    480: { slidesPerView: 2, spaceBetween: 12 },
    768: { slidesPerView: 3, spaceBetween: 14 },
    1024: { slidesPerView: 4, spaceBetween: 18 },
    1300: { slidesPerView: 5, spaceBetween: 20 },
  };

  const usedBreakpoints = breakpoints || defaultBreakpoints;

  return (
    <div className={styles.carouselWrap}>
      <Swiper
        modules={[Navigation]}
        onSwiper={(sw) => {
          swiperRef.current = sw;
          // initial flags
          setIsBeginning(sw.isBeginning);
          setIsEnd(sw.isEnd);
        }}
        onSlideChange={(sw) => {
          setIsBeginning(sw.isBeginning);
          setIsEnd(sw.isEnd);
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // connect refs after init
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.prevEl = prevRef.current;
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();

          // set flags
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={usedBreakpoints}
        spaceBetween={spaceBetween}
        className={styles.swiper}
      >
        {React.Children.map(children, (child, idx) => (
          <SwiperSlide key={idx} className={styles.slide}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {navigation && (
        <>
          <button
            ref={prevRef}
            type="button"
            className={`${styles.nav} ${styles.prev} ${
              isBeginning ? styles.disabled : ""
            }`}
            aria-label="Previous"
            onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
          >
            <img src={leftImg} alt="Previous" />
          </button>

          <button
            ref={nextRef}
            type="button"
            className={`${styles.nav} ${styles.next} ${
              isEnd ? styles.disabled : ""
            }`}
            aria-label="Next"
            onClick={() => swiperRef.current && swiperRef.current.slideNext()}
          >
            <img src={rightImg} alt="Next" />
          </button>
        </>
      )}
    </div>
  );
}
