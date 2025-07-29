"use client";

import type React from "react";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import images (you'll need to replace these with your actual image imports)
import person1 from "../../src/assets/images/person1.png";
import person2 from "../../src/assets/images/person2.png";
import person3 from "../../src/assets/images/person3.png";
import person4 from "../../src/assets/images/person4.png";
import person5 from "../../src/assets/images/person5.png";
import person6 from "../../src/assets/images/person6.png";
import icon1 from "../../src/assets/images/icon1.png";
import icon2 from "../../src/assets/images/icon2.png";
import icon3 from "../../src/assets/images/icon3.png";
import icon4 from "../../src/assets/images/icon4.png";
import icon5 from "../../src/assets/images/icon5.png";
import { toast } from "sonner";

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const tabs = [
    "All",
    "Founder",
    "Co-founder",
    "Authors",
    "Publisher",
    "Senior Author",
  ];

  const team = [
    {
      name: "Nayemul Karim",
      role: "Founder & Chief Editor",
      category: "Founder",
      img: person1,
    },
    {
      name: "Shezan Mahmud",
      role: "Co-founder & Operations Head",
      category: "Co-founder",
      img: person2,
    },
    {
      name: "Mahbubul Karim",
      role: "Lead Publisher",
      category: "Publisher",
      img: person3,
    },
    {
      name: "Ayesha Siddiqah",
      role: "Creative Director",
      category: "Authors",
      img: person4,
    },
    {
      name: "Latisha Miles",
      role: "Publisher",
      category: "Publisher",
      img: person5,
    },
    {
      name: "Ayesha Haque",
      role: "Senior Author",
      category: "Senior Author",
      img: person6,
    },
  ];

  const filteredTeam =
    activeTab === "All"
      ? team
      : team.filter((member) => member.category === activeTab);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();

    // FormData স্টেট রিসেট করা
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });

    toast.success("Message send done...", { duration: 2000 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Team Section */}
        <section className="mb-20 lg:mb-32">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Meet Our Team
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Get to know the passionate individuals behind our success
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12 lg:mb-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Team Cards */}
          <div className="relative">
            {/* Mobile Swiper */}
            <div className="lg:hidden">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1.2}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet !bg-white/50",
                  bulletActiveClass:
                    "swiper-pagination-bullet-active !bg-white",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    centeredSlides: false,
                  },
                }}
                className="pb-12"
              >
                {filteredTeam.map((member, index) => (
                  <SwiperSlide key={index}>
                    <TeamCard member={member} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredTeam.map((member, index) => (
                <TeamCard key={index} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Info Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Ccircle cx=30 cy=30 r=1/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

                <div className="relative z-10">
                  <h3 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-8 leading-tight">
                    Still Have A<br />
                    Questions?
                  </h3>

                  <p className="text-white/90 mb-8 text-lg">
                    We're here to help! Reach out to us through any of these
                    channels.
                  </p>

                  {/* Contact Icons */}
                  <div className="flex items-center justify-between max-w-md">
                    {[icon1, icon2, icon3, icon4, icon5].map((icon, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
                      >
                        <img
                          src={icon || "/placeholder.svg"}
                          alt={`Contact option ${index + 1}`}
                          className="w-6 h-6 lg:w-8 lg:h-8"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name..."
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email..."
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Phone and Service Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-white font-medium mb-2"
                    >
                      WhatsApp/Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your number..."
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-white font-medium mb-2"
                    >
                      Looking for Support in?
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="bg-gray-800">
                        Choose services
                      </option>
                      <option value="support" className="bg-gray-800">
                        Support
                      </option>
                      <option value="inquiry" className="bg-gray-800">
                        Inquiry
                      </option>
                      <option value="collaboration" className="bg-gray-800">
                        Collaboration
                      </option>
                      <option value="other" className="bg-gray-800">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2"
                  >
                    How Can We Help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Message goes in here..."
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 hover:from-purple-600 hover:via-purple-700 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Team Card Component
const TeamCard = ({ member }: { member: any }) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <img
          src={member.img || "/placeholder.svg"}
          alt={member.name}
          className="w-full h-80 lg:h-96 p-4 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
          <p className="text-purple-300 font-medium">{member.role}</p>
          <div className="mt-2">
            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
              {member.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
