import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { MdOutlineArrowOutward } from "react-icons/md";
import card1 from "../../assets/images/HomePagePhoto/serviceMike.png";
import card2 from "../../assets/images/HomePagePhoto/serviceBulb.png";
import card3 from "../../assets/images/HomePagePhoto/serviceWeb.png";
import card5 from "../../assets/images/HomePagePhoto/serviceGraphics.png";
import card6 from "../../assets/images/HomePagePhoto/serviceMultimedia.png";
import card11 from "../../assets/images/HomePagePhoto/Frame (7).png";

const BookCategories = () => {
      const cards = [
    {
      img: card1,
      title: "Bestselling Books",
      desc: "Discover the most popular books loved by readers worldwide",
      color: "from-pink-500 to-rose-500",
    },
    {
      img: card2,
      title: "Creative Writing Works",
      desc: "Unleash your creativity with inspiring writing guides",
      color: "from-purple-500 to-violet-500",
    },
    {
      img: card3,
      title: "Web & Tech Books",
      desc: "Stay updated with the latest technology trends",
      color: "from-blue-500 to-cyan-500",
    },
    {
      img: card5,
      title: "Graphic Design Inspirations",
      desc: "Visual storytelling and design masterpieces",
      color: "from-emerald-500 to-teal-500",
    },
    {
      img: card6,
      title: "Multimedia & Video Resources",
      desc: "Learn multimedia production and video editing",
      color: "from-orange-500 to-red-500",
    },
    {
      img: card11,
      title: "Special Offers",
      desc: "Exclusive deals and limited-time offers",
      color: "from-yellow-500 to-amber-500",
    },
  ];

    return (
        <div>
                  <section className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover books across various genres and categories tailored to
              your interests
            </p>
          </div>

          {/* Mobile Swiper */}
          <div className="lg:hidden">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              modules={[Pagination, Autoplay]}
              className="pb-16"
            >
              {cards.map((card, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`relative bg-gradient-to-br ${card.color} p-8 rounded-3xl shadow-2xl h-80 flex flex-col justify-between overflow-hidden group`}
                  >
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                        <img
                          src={
                            card.img || "/placeholder.svg?height=40&width=40"
                          }
                          alt="icon"
                          className="w-10 h-10"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <button className="relative z-10 inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>Explore</span>
                      <MdOutlineArrowOutward className="w-5 h-5" />
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${card.color} p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl group cursor-pointer overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={card.img || "/placeholder.svg?height=40&width=40"}
                      alt="icon"
                      className="w-10 h-10"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed mb-6">
                    {card.desc}
                  </p>

                  <button className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>Explore</span>
                    <MdOutlineArrowOutward className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default BookCategories;