"use client"

import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone, Mail } from "lucide-react"
import { useState } from "react"

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const faqs = [
    {
      id: 1,
      question: "How can I place an order?",
      answer:
        "You can place an order by browsing our collection, adding books to your cart, and proceeding to checkout. We accept various payment methods including bKash, Nagad, and bank transfers.",
      category: "Ordering",
    },
    {
      id: 2,
      question: "What are your delivery options?",
      answer:
        "We offer home delivery across Bangladesh. Delivery usually takes 2-5 business days depending on your location. We also provide express delivery for urgent orders.",
      category: "Delivery",
    },
    {
      id: 3,
      question: "Do you offer cash on delivery?",
      answer:
        "Yes, we offer cash on delivery (COD) service for orders within Dhaka city. For orders outside Dhaka, advance payment is required.",
      category: "Payment",
    },
    {
      id: 4,
      question: "What is your return policy?",
      answer:
        "We have a 7-day return policy. If you're not satisfied with your purchase, you can return the book in its original condition for a full refund or exchange.",
      category: "Returns",
    },
    {
      id: 5,
      question: "Are the books original?",
      answer:
        "Yes, all our books are 100% original. We source directly from publishers and authorized distributors to ensure authenticity.",
      category: "Quality",
    },
    {
      id: 6,
      question: "Do you have books in Bengali?",
      answer:
        "We have an extensive collection of Bengali books including novels, poetry, academic books, and children's literature from renowned Bengali authors.",
      category: "Collection",
    },
    {
      id: 7,
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via SMS and email. You can use this number to track your order status on our website.",
      category: "Tracking",
    },
    {
      id: 8,
      question: "Do you offer discounts for bulk orders?",
      answer:
        "Yes, we offer special discounts for bulk orders (10+ books). Please contact our customer service team for bulk pricing and custom quotes.",
      category: "Pricing",
    },
  ]

  const categories = [
    "All",
    "Ordering",
    "Delivery",
    "Payment",
    "Returns",
    "Quality",
    "Collection",
    "Tracking",
    "Pricing",
  ]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredFAQs = selectedCategory === "All" ? faqs : faqs.filter((faq) => faq.category === selectedCategory)

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const contactOptions = [
    {
      icon: Phone,
      title: "Call Us",
      description: "+880 1234-567890",
      action: "Call Now",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "support@bookbazzar.com",
      action: "Send Email",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Need Help?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services, delivery, and more
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Side - Contact Options */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-6">Still Need Help?</h3>
            <p className="text-gray-300 mb-8">
              Can't find what you're looking for? Our customer support team is here to help you 24/7.
            </p>

            <div className="space-y-4">
              {contactOptions.map((option, index) => {
                const Icon = option.icon
                return (
                  <div
                    key={index}
                    className={`relative bg-gradient-to-r ${option.color} p-6 rounded-2xl transition-all duration-300 hover:scale-105 group cursor-pointer`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{option.title}</h4>
                        <p className="text-white/80 text-sm mb-2">{option.description}</p>
                        <span className="text-white text-sm font-medium group-hover:underline">{option.action} →</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl">
              <h4 className="text-white font-semibold mb-4">Support Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Response Time</span>
                  <span className="text-white font-semibold">&lt; 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Satisfaction Rate</span>
                  <span className="text-white font-semibold">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Available</span>
                  <span className="text-green-400 font-semibold">24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - FAQ */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/15"
                >
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer group"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs font-medium">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 text-white/70 group-hover:text-white transition-colors ml-4">
                      {activeIndex === index ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </div>
                  </div>

                  {activeIndex === index && (
                    <div className="px-6 pb-6 transition-all duration-300">
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No FAQs Found</h3>
                <p className="text-gray-300">Try selecting a different category or contact our support team.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
