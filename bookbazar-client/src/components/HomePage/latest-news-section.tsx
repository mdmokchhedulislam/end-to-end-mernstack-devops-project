"use client"

import { Calendar, User, Clock, ArrowRight, Newspaper, Bookmark } from "lucide-react"

const LatestNewsSection = () => {
  const newsArticles = [
    {
      id: 1,
      title: "New Bengali Literature Collection Arrives",
      excerpt:
        "We've added over 200 new Bengali books from renowned authors including contemporary fiction and classic literature.",
      author: "BookBazzar Team",
      date: "December 15, 2024",
      readTime: "3 min read",
      category: "New Arrivals",
      featured: true,
    },
    {
      id: 2,
      title: "Winter Reading Challenge 2024",
      excerpt:
        "Join our winter reading challenge and read 5 books before February. Winners get exclusive discounts and prizes.",
      author: "Community Manager",
      date: "December 12, 2024",
      readTime: "2 min read",
      category: "Events",
      featured: false,
    },
    {
      id: 3,
      title: "Author Interview: Humayun Ahmed's Legacy",
      excerpt:
        "Exploring the lasting impact of Bangladesh's beloved author and his contribution to modern Bengali literature.",
      author: "Literary Editor",
      date: "December 10, 2024",
      readTime: "5 min read",
      category: "Interviews",
      featured: false,
    },
    {
      id: 4,
      title: "Best Books of 2024: Our Top Picks",
      excerpt:
        "Discover the most popular and critically acclaimed books of this year across all genres and categories.",
      author: "Editorial Team",
      date: "December 8, 2024",
      readTime: "4 min read",
      category: "Reviews",
      featured: false,
    },
    {
      id: 5,
      title: "Free Shipping Extended Until New Year",
      excerpt: "Great news! We're extending our free shipping offer on all orders above ৳300 until January 1st, 2025.",
      author: "Customer Service",
      date: "December 5, 2024",
      readTime: "1 min read",
      category: "Announcements",
      featured: false,
    },
  ]

  const categories = [
    { name: "New Arrivals", count: 12, color: "from-blue-500 to-cyan-500" },
    { name: "Events", count: 8, color: "from-green-500 to-emerald-500" },
    { name: "Interviews", count: 6, color: "from-purple-500 to-pink-500" },
    { name: "Reviews", count: 15, color: "from-orange-500 to-red-500" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <Newspaper className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Latest Updates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">News & Updates</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay updated with the latest news, book releases, and community events
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Article */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>
                <span className="text-purple-400 text-sm">{newsArticles[0].category}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{newsArticles[0].title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{newsArticles[0].excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{newsArticles[0].author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{newsArticles[0].date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{newsArticles[0].readTime}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Other Articles */}
            <div className="grid md:grid-cols-2 gap-6">
              {newsArticles.slice(1).map((article) => (
                <div
                  key={article.id}
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-medium">
                      {article.category}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <span>{article.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span className="text-white font-medium">{category.name}</span>
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { icon: Bookmark, text: "Reading Lists", color: "text-blue-400" },
                  { icon: Calendar, text: "Upcoming Events", color: "text-green-400" },
                  { icon: User, text: "Author Profiles", color: "text-purple-400" },
                  { icon: Newspaper, text: "Book Reviews", color: "text-orange-400" },
                ].map((link, index) => {
                  const Icon = link.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                      <Icon className={`w-5 h-5 ${link.color}`} />
                      <span className="text-white group-hover:text-purple-300 transition-colors">{link.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Stay in the Loop</h3>
            <p className="text-gray-300 mb-6">Subscribe to get the latest news and updates delivered to your inbox</p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LatestNewsSection
