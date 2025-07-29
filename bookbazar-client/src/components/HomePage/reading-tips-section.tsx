"use client"

import { Target, Clock, MapPin, Users, Bookmark, Coffee } from "lucide-react"

const ReadingTipsSection = () => {
  const tips = [
    {
      icon: Target,
      title: "Set Reading Goals",
      description: "Start with small, achievable goals like 10 pages a day or 1 book per month.",
      tip: "Track your progress to stay motivated",
    },
    {
      icon: Clock,
      title: "Create a Reading Schedule",
      description: "Dedicate specific times for reading, like 30 minutes before bed or during lunch.",
      tip: "Consistency is key to building a habit",
    },
    {
      icon: MapPin,
      title: "Find Your Reading Spot",
      description: "Choose a comfortable, quiet place where you can focus without distractions.",
      tip: "Good lighting and comfortable seating help",
    },
    {
      icon: Users,
      title: "Join Reading Communities",
      description: "Connect with other readers to share recommendations and discuss books.",
      tip: "Book clubs make reading more social",
    },
    {
      icon: Bookmark,
      title: "Take Notes",
      description: "Write down interesting quotes, thoughts, or questions while reading.",
      tip: "This helps with comprehension and retention",
    },
    {
      icon: Coffee,
      title: "Make it Enjoyable",
      description: "Create a cozy atmosphere with your favorite drink or background music.",
      tip: "Reading should be a pleasure, not a chore",
    },
  ]

  return (
    <section className="py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Reading Tips & Tricks</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Practical advice to help you become a better and more consistent reader
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/15"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">{tip.title}</h3>
                    <p className="text-gray-300 mb-3 leading-relaxed">{tip.description}</p>
                    <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
                      <p className="text-purple-300 text-sm font-medium">💡 {tip.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Tips */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Quick Reading Facts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">6 min</div>
              <div className="text-gray-300">Reading reduces stress by 68%</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">15 min</div>
              <div className="text-gray-300">Daily reading improves focus</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">12 books</div>
              <div className="text-gray-300">Average annual reading goal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReadingTipsSection
