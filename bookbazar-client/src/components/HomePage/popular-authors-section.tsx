"use client"

import { BookOpen, Users, Award, ExternalLink } from "lucide-react"
import { useState } from "react"

const PopularAuthorsSection = () => {
  const [hoveredAuthor, setHoveredAuthor] = useState<number | null>(null)

  const authors = [
    {
      id: 1,
      name: "হুমায়ূন আহমেদ",
      image: "/placeholder.svg?height=120&width=120",
      genre: "Fiction & Drama",
      booksCount: 45,
      followers: "2.5M",
      rating: 4.9,
      description: "বাংলা সাহিত্যের অন্যতম জনপ্রিয় লেখক। তার লেখা উপন্যাস ও নাটক পাঠকদের হৃদয় ছুঁয়ে যায়।",
      popularBooks: ["মিসির আলি", "হিমু", "শঙ্খনীল কারাগার"],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      name: "রবীন্দ্রনাথ ঠাকুর",
      image: "/placeholder.svg?height=120&width=120",
      genre: "Poetry & Literature",
      booksCount: 60,
      followers: "5M",
      rating: 5.0,
      description: "বিশ্বকবি রবীন্দ্রনাথ ঠাকুর। নোবেল পুরস্কার বিজয়ী এই মহান কবির রচনা আজও অমর।",
      popularBooks: ["গীতাঞ্জলি", "গোরা", "ঘরে বাইরে"],
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      name: "কাজী নজরুল ইসলাম",
      image: "/placeholder.svg?height=120&width=120",
      genre: "Poetry & Revolution",
      booksCount: 35,
      followers: "3M",
      rating: 4.8,
      description: "বিদ্রোহী কবি কাজী নজরুল ইসলাম। তার কবিতা ও গানে রয়েছে অসাধারণ শক্তি ও প্রেরণা।",
      popularBooks: ["বিদ্রোহী", "অগ্নিবীণা", "সাম্যবাদী"],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      name: "শরৎচন্দ্র চট্টোপাধ্যায়",
      image: "/placeholder.svg?height=120&width=120",
      genre: "Social Fiction",
      booksCount: 25,
      followers: "1.8M",
      rating: 4.7,
      description: "সমাজের নানা সমস্যা নিয়ে লেখা তার উপন্যাসগুলো আজও সমান জনপ্রিয়।",
      popularBooks: ["দেবদাস", "পরিণীতা", "চরিত্রহীন"],
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      name: "বঙ্কিমচন্দ্র চট্টোপাধ্যায়",
      image: "/placeholder.svg?height=120&width=120",
      genre: "Historical Fiction",
      booksCount: 20,
      followers: "1.5M",
      rating: 4.6,
      description: "বাংলা উপন্যাসের জনক বঙ্কিমচন্দ্র। তার ঐতিহাসিক উপন্যাসগুলো অমূল্য সম্পদ।",
      popularBooks: ["আনন্দমঠ", "কপালকুণ্ডলা", "দুর্গেশনন্দিনী"],
      gradient: "from-violet-500 to-purple-500",
    },
    {
      id: 6,
      name: "সৈয়দ মুজতবা আলী",
      image: "/placeholder.svg?height=120&width=120",
      genre: "Travel & Humor",
      booksCount: 30,
      followers: "1.2M",
      rating: 4.8,
      description: "ভ্রমণকাহিনী ও হাস্যরসের অপূর্ব মিশ্রণে তার লেখা আজও পাঠকপ্রিয়।",
      popularBooks: ["দেশে বিদেশে", "পঞ্চতন্ত্র", "চাচা কাহিনী"],
      gradient: "from-teal-500 to-blue-500",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Popular Authors</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover books from the most beloved authors in Bengali literature and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <div
              key={author.id}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              onMouseEnter={() => setHoveredAuthor(author.id)}
              onMouseLeave={() => setHoveredAuthor(null)}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${author.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
              ></div>

              <div className="relative z-10 p-8">
                {/* Author Image */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <img
                      src={author.image || "/placeholder.svg"}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Author Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{author.name}</h3>
                  <p className="text-purple-400 text-sm font-medium mb-3">{author.genre}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{author.description}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-bold text-lg">{author.booksCount}</span>
                    </div>
                    <p className="text-gray-400 text-xs">Books</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-green-400" />
                      <span className="text-white font-bold text-lg">{author.followers}</span>
                    </div>
                    <p className="text-gray-400 text-xs">Followers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="text-white font-bold text-lg">{author.rating}</span>
                    </div>
                    <p className="text-gray-400 text-xs">Rating</p>
                  </div>
                </div>

                {/* Popular Books - Shows on hover */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${hoveredAuthor === author.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="border-t border-white/10 pt-4">
                    <h4 className="text-white font-semibold text-sm mb-3">Popular Books:</h4>
                    <div className="space-y-2">
                      {author.popularBooks.map((book, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-gray-300 text-sm">{book}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View Books Button */}
                <button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg group flex items-center justify-center gap-2">
                  <span>View Books</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Authors Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <span>View All Authors</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default PopularAuthorsSection
