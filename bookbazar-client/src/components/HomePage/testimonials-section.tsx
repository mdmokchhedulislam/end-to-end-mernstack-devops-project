"use client"

import { Star, Quote } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "রাহুল আহমেদ",
      role: "Software Engineer",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "BookBazzar থেকে বই কিনে অসাধারণ অভিজ্ঞতা পেয়েছি। দ্রুত ডেলিভারি এবং বইয়ের কোয়ালিটি চমৎকার। প্রতিটি বই নতুনের মতো পেয়েছি।",
      location: "ঢাকা, বাংলাদেশ",
    },
    {
      id: 2,
      name: "ফাতিমা খান",
      role: "University Student",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "আমার পছন্দের সব বই এখানে পেয়ে যাই। দাম অনেক সাশ্রয়ী এবং কাস্টমার সার্ভিস অসাধারণ। সবার কাছে রেকমেন্ড করি।",
      location: "চট্টগ্রাম, বাংলাদেশ",
    },
    {
      id: 3,
      name: "মোহাম্মদ করিম",
      role: "Teacher",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "শিক্ষামূলক বইয়ের জন্য এটি আমার প্রথম পছন্দ। বিভিন্ন ক্যাটাগরির বই পাওয়া যায় এবং অর্ডার করা খুবই সহজ।",
      location: "সিলেট, বাংলাদেশ",
    },
    {
      id: 4,
      name: "সাবিনা আক্তার",
      role: "Doctor",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "মেডিকেল বই থেকে শুরু করে উপন্যাস সব ধরনের বই পাই। প্যাকেজিং অনেক ভালো এবং বই নষ্ট হওয়ার কোন সম্ভাবনা নেই।",
      location: "রাজশাহী, বাংলাদেশ",
    },
    {
      id: 5,
      name: "তানভীর হাসান",
      role: "Business Owner",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "বিজনেস রিলেটেড বই খুঁজতে গিয়ে BookBazzar পেয়েছি। এখন আমার সব বই এখান থেকেই কিনি। সার্ভিস অসাধারণ!",
      location: "খুলনা, বাংলাদেশ",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">What Our Readers Say</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect books with us
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <Quote className="w-12 h-12 text-purple-400" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 text-base leading-relaxed mb-6 relative z-10">"{testimonial.text}"</p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-purple-500/30"
                />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <p className="text-purple-400 text-xs">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="lg:hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            modules={[Pagination, Autoplay]}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                  <div className="absolute top-6 right-6 opacity-20">
                    <Quote className="w-12 h-12 text-purple-400" />
                  </div>

                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-300 text-base leading-relaxed mb-6">"{testimonial.text}"</p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-500/30"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      <p className="text-purple-400 text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "5,000+", label: "Happy Customers" },
            { number: "4.9/5", label: "Average Rating" },
            { number: "99%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
