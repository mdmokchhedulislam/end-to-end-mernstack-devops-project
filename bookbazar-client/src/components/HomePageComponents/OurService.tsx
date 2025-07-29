import { MdOutlineArrowOutward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";


import { Pagination } from "swiper/modules";

// Import Card Images

import card1 from "../../assets/images/HomePagePhoto/serviceMike.png";
import card2 from "../../assets/images/HomePagePhoto/serviceBulb.png";
import card3 from "../../assets/images/HomePagePhoto/serviceWeb.png";
import card5 from "../../assets/images/HomePagePhoto/serviceGraphics.png";
import card6 from "../../assets/images/HomePagePhoto/serviceMultimedia.png";

import card11 from "../../assets/images/HomePagePhoto/Frame (7).png";

const OurService = () => {
  const cards = [
    { img: card1, title: "Bestselling Books" },
    { img: card2, title: "Creative Writing Works" },
    { img: card3, title: "Web & Tech Books" },
    { img: card5, title: "Graphic Design Inspirations" },
    { img: card6, title: "Multimedia & Video Resources" },
    { img: card11, title: "Special Offers" },
  ];

  return (
    <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] rounded-3xl">
      <div className="space-y-4 pt-10 pb-10">
        <h1 className="lg:text-5xl text-[28px] font-semibold text-white text-center">
          Our Book Collection
        </h1>
        <p className="text-[#F3F3F4] lg:text-lg text-[14px] text-center pt-4">
          Step into a world of captivating stories and knowledge, <br /> where finding
          your next favorite book is
          <br />
          effortless and enjoyable with our carefully curated collection.
        </p>
      </div>

      {/* Swiper Slider for Small Devices */}
      <div className="lg:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="w-full"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-lg bg-gradient-to-r from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] p-6 text-left h-[400px]">
                <div className="flex justify-start mb-3 w-14 h-14">
                  <img src={card.img} alt="icon" className="w-14 h-14" />
                </div>
                <h2 className="text-white text-3xl font-semibold mb-3">
                  {card.title}
                </h2>
                <p className="text-[#F3F3F4] text-lg">
                  We are constantly expanding our collection and knowledge to
                  help you discover your next great read. Enter our book
                  sanctuary, where finding the perfect book is effortless and
                  enjoyable with our expert recommendations.
                </p>
                <button className="bg-clip-text bg-gradient-to-r from-[#6384FC] via-[#C16EFD] to-[#6384FC] text-lg font-medium mt-4 flex items-center gap-2 lg:justify-start justify-center mx-auto">
                  <p className="text-transparent">Read More</p>{" "}
                  <MdOutlineArrowOutward />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid View for Large Devices */}
      <div className="hidden lg:grid lg:grid-cols-3 grid-cols-1 gap-8 my-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="rounded-lg bg-gradient-to-r from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] p-6"
          >
            <div className="flex justify-start mb-3">
              <img src={card.img} alt="icon" className="w-18 h-18" />
            </div>
            <h2 className="text-white text-3xl font-semibold mb-3">
              {card.title}
            </h2>
            <p className="text-[#F3F3F4] text-lg">
              We are constantly expanding our collection and knowledge to help
              you discover your next great read. Enter our book sanctuary, where
              finding the perfect book is effortless and enjoyable with our
              expert recommendations.
            </p>
            <button className="bg-clip-text bg-gradient-to-r from-[#6384FC] via-[#C16EFD] to-[#6384FC] text-lg font-medium mt-4 flex items-center gap-2">
              <p className="text-transparent">Read More</p>{" "}
              <MdOutlineArrowOutward />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurService;
