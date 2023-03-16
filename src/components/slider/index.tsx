import React, { ReactNode, ReactPortal } from "react";
import { Swiper } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useBreakpointValue } from "@/hooks/useBreakpointValue";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

export const SliderEffectCoverflow = ({
  heightSlider = "500px",
  children,
}: {
  heightSlider?: string;
  children: ReactNode;
}) => {
  const isMobile = useBreakpointValue(["xxxs", "xxs", "xs", "sm"]);

  return (
    <Swiper
      navigation
      effect="coverflow"
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      slidesPerView={2}
      centeredSlides
      style={{ height: isMobile ? "200px" : heightSlider }}
    >
      {children}
    </Swiper>
  );
};
