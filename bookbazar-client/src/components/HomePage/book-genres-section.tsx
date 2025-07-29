"use client"

import { Sword, Heart, Zap, Microscope, Briefcase, Baby, Globe, Palette } from "lucide-react"
import { Link } from "react-router-dom"

const BookGenresSection = () => {
  const genres = [
    {
      icon: Sword,
      title: "Adventure & Fantasy",
      description: "Epic journeys and magical worlds",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: Heart,
      title: "Romance",
      description: "Love stories that touch the heart",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Zap,
      title: "Thriller & Mystery",
      description: "Edge-of-your-seat suspense",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Microscope,
      title: "Science & Technology",
      description: "Latest discoveries and innovations",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Briefcase,
      title: "Business & Finance",
      description: "Success strategies and financial wisdom",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Baby,
      title: "Children's Books",
      description: "Fun and educational stories for kids",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: Globe,
      title: "History & Culture",
      description: "Explore the past and different cultures",
      color: "from-teal-500 to-green-500",
    },
    {
      icon: Palette,
      title: "Art & Design",
      description: "Creative inspiration and techniques",
      color: "from-violet-500 to-purple-500",
    },
  ]

  return (
    <section className="py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Explore Book Genres</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find your favorite genre and discover new worlds of knowledge and entertainment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {genres.map((genre, index) => {
            const Icon = genre.icon
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${genre.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{genre.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{genre.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs group-hover:text-white transition-colors"><Link to={'/all-product'}>Explore →</Link></span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BookGenresSection
