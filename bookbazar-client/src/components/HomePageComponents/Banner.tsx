// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "../../styles/BannerStyle.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Banner() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="h-[70vh] w-full bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] ">
            <img src="http://res.cloudinary.com/dn7oeugls/image/upload/v1737968509/jguhl6gfmtpjsxbavsjz.jpg" alt=""  className="object-cover py-4 rounded-3xl"/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[70vh] w-full bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
            <img src="http://res.cloudinary.com/dn7oeugls/image/upload/v1737968720/q6nq7tcpnknowycxyj2y.jpg" alt=""  className="object-cover py-4 rounded-3xl"/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-[70vh] w-full bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
            <img src="http://res.cloudinary.com/dn7oeugls/image/upload/v1737968841/o33wem8sqeqcziqbjkea.jpg" alt=""  className="object-cover py-4 rounded-3xl"/>
          </div>
        </SwiperSlide>
       
        
        
      </Swiper>
    </>
  );
}
