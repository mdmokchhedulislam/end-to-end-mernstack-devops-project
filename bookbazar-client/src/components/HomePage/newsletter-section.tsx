"use client";

import type React from "react";

import { Mail, Send, Gift, Bell } from "lucide-react";
import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Discounts",
      description: "Get up to 30% off on selected books",
    },
    {
      icon: Bell,
      title: "New Arrivals",
      description: "Be the first to know about new books",
    },
    {
      icon: Mail,
      title: "Weekly Updates",
      description: "Curated book recommendations just for you",
    },
  ];

  return (
    <section className="py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5"></div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 text-sm font-medium">
                    Stay Updated
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Never Miss a
                  <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Great Book Deal
                  </span>
                </h2>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Subscribe to our newsletter and get exclusive access to new
                  arrivals, special discounts, and personalized book
                  recommendations delivered straight to your inbox.
                </p>

                {/* Benefits */}
                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">
                            {benefit.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Content - Newsletter Form */}
              <div className="relative">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Join 10,000+ Book Lovers
                  </h3>

                  {!isSubscribed ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group"
                      >
                        <span>Subscribe Now</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <p className="text-gray-400 text-xs text-center">
                        By subscribing, you agree to our Privacy Policy and
                        Terms of Service.
                      </p>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        Successfully Subscribed!
                      </h4>
                      <p className="text-gray-300">
                        Thank you for joining our community. Check your email
                        for a welcome message.
                      </p>
                    </div>
                  )}
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full opacity-60 animate-pulse"></div>
                <div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full opacity-40 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
