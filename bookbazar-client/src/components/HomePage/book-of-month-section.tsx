"use client"

import { Star, Calendar, Award, ShoppingCart, Heart, Share2 } from "lucide-react"
import { useState } from "react"

const BookOfMonthSection = () => {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const bookOfMonth = {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    image: "/placeholder.svg?height=400&width=300",
    originalPrice: 1200,
    discountPrice: 850,
    discount: 30,
    rating: 4.8,
    reviews: 2847,
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices...",
    features: [
      "International Bestseller",
      "Goodreads Choice Award Winner",
      "Translated in 40+ Languages",
      "Over 1 Million Copies Sold",
    ],
    category: "Fiction",
    pages: 288,
    language: "English",
    publisher: "Canongate Books",
    isbn: "978-1786892737",
  }

  const relatedBooks = [
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      image: "/placeholder.svg?height=200&width=150",
      price: 950,
      rating: 4.9,
    },
    {
      id: 3,
      title: "The Seven Husbands",
      author: "Taylor Jenkins Reid",
      image: "/placeholder.svg?height=200&width=150",
      price: 780,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Educated",
      author: "Tara Westover",
      image: "/placeholder.svg?height=200&width=150",
      price: 890,
      rating: 4.6,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-6">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-medium">Book of the Month</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">December 2024 Pick</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Carefully selected by our literary experts and loved by thousands of readers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Book Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 group">
              {/* Discount Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                {bookOfMonth.discount}% OFF
              </div>

              {/* Book Image */}
              <div className="relative mx-auto w-fit">
                <img
                  src={bookOfMonth.image || "/placeholder.svg"}
                  alt={bookOfMonth.title}
                  className="w-80 h-96 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full opacity-60 animate-pulse"></div>
                <div
                  className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-500 rounded-full opacity-40 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full border transition-all duration-300 ${
                    isWishlisted
                      ? "bg-red-500 border-red-500 text-white"
                      : "border-white/20 text-gray-400 hover:border-red-500 hover:text-red-400"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
                <button className="p-3 rounded-full border border-white/20 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Book Details */}
          <div className="space-y-8">
            {/* Book Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                  {bookOfMonth.category}
                </span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">December 2024</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{bookOfMonth.title}</h1>
              <p className="text-xl text-gray-300 mb-4">by {bookOfMonth.author}</p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(bookOfMonth.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                    />
                  ))}
                  <span className="text-white font-semibold ml-2">{bookOfMonth.rating}</span>
                </div>
                <span className="text-gray-400">({bookOfMonth.reviews.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-white">৳{bookOfMonth.discountPrice}</span>
                <span className="text-xl text-gray-400 line-through">৳{bookOfMonth.originalPrice}</span>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                  Save ৳{bookOfMonth.originalPrice - bookOfMonth.discountPrice}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6">{bookOfMonth.description}</p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {bookOfMonth.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Book Details */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div>
                  <p className="text-gray-400 text-sm">Pages</p>
                  <p className="text-white font-semibold">{bookOfMonth.pages}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Language</p>
                  <p className="text-white font-semibold">{bookOfMonth.language}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Publisher</p>
                  <p className="text-white font-semibold">{bookOfMonth.publisher}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">ISBN</p>
                  <p className="text-white font-semibold">{bookOfMonth.isbn}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="flex-1 border-2 border-purple-500/50 text-purple-300 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:bg-purple-500/10 hover:border-purple-400">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books */}
        <div className="mt-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <img
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                />
                <h4 className="text-lg font-bold text-white mb-2">{book.title}</h4>
                <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">৳{book.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{book.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookOfMonthSection
