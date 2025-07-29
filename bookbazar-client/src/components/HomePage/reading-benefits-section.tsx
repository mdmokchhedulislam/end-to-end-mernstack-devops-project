"use client";

import {
  Brain,
  Heart,
  Clock,
  Users,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

const ReadingBenefitsSection = () => {
  const benefits = [
    {
      icon: Brain,
      title: "Improves Brain Function",
      description:
        "Reading enhances cognitive abilities, memory, and critical thinking skills.",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: Heart,
      title: "Reduces Stress",
      description:
        "Reading for just 6 minutes can reduce stress levels by up to 68%.",
      color: "from-pink-500 to-red-500",
    },
    {
      icon: Clock,
      title: "Better Sleep",
      description:
        "Reading before bed helps you relax and improves sleep quality.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Builds Empathy",
      description:
        "Reading fiction helps you understand different perspectives and emotions.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Expands Vocabulary",
      description:
        "Regular reading significantly increases your vocabulary and language skills.",
      color: "from-orange-500 to-yellow-500",
    },
    {
      icon: Lightbulb,
      title: "Sparks Creativity",
      description:
        "Reading stimulates imagination and enhances creative thinking abilities.",
      color: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <section className="py-15 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Reading is Good for You
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover the amazing benefits of reading and how it can transform
            your life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-2">68%</div>
            <div className="text-gray-400">Stress Reduction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">30min</div>
            <div className="text-gray-400">Daily Reading</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-400">New Words/Month</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400">Brain Exercise</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadingBenefitsSection;
