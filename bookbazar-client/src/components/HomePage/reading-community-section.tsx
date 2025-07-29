"use client";

import {
  Users,
  MessageCircle,
  Calendar,
  Award,
  BookOpen,
  Star,
} from "lucide-react";

const ReadingCommunitySection = () => {
  const communityFeatures = [
    {
      icon: Users,
      title: "Book Clubs",
      description:
        "Join monthly book clubs and discuss your favorite reads with fellow book lovers.",
      members: "2,500+ members",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageCircle,
      title: "Discussion Forums",
      description:
        "Share thoughts, reviews, and recommendations in our active community forums.",
      members: "5,000+ discussions",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Calendar,
      title: "Reading Events",
      description:
        "Participate in author meetups, book launches, and literary events.",
      members: "50+ events/month",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Reading Challenges",
      description:
        "Take part in monthly reading challenges and earn badges for your achievements.",
      members: "1,000+ participants",
      color: "from-orange-500 to-red-500",
    },
  ];

  const activities = [
    {
      icon: BookOpen,
      title: "Weekly Book Reviews",
      time: "Every Friday",
      description: "Share and read honest book reviews from community members",
    },
    {
      icon: Star,
      title: "Author Spotlights",
      time: "Monthly",
      description: "Featured interviews and discussions with popular authors",
    },
    {
      icon: Users,
      title: "Reading Buddy Program",
      time: "Ongoing",
      description: "Get paired with a reading partner to share your journey",
    },
  ];

  return (
    <section className="py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Join Our Reading Community
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Connect with thousands of book lovers, share your passion, and
            discover new reads together
          </p>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <span className="text-purple-400 font-semibold text-sm">
                    {feature.members}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Activities */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Community Activities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {activity.title}
                  </h4>
                  <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                    {activity.time}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Join CTA */}
        <div className="text-center mt-12">
          <div className="inline-block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Join?
            </h3>
            <p className="text-gray-300 mb-6">
              Become part of Bangladesh's largest reading community
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadingCommunitySection;
