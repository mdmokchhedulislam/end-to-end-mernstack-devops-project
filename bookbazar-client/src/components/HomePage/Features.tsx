import { BookOpen, RotateCcw, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";

const Features = () => {


  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: BookOpen,
      title: "Explore Our Collection",
      description:
        "Dive into our curated collection of books tailored for every reader. Whether you love fiction, non-fiction, or academic resources, we have something special for you.",
      gradient: "from-violet-600 via-purple-600 to-blue-600",
      count: "10,000+",
      label: "Books Available",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description:
        "Enjoy free shipping on all orders above ৳500. We ensure a fast and secure delivery system right to your doorstep.",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      count: "24-48h",
      label: "Delivery Time",
    },
    {
      icon: ShoppingBag,
      title: "Shop Now",
      description:
        "Start your book-buying journey with us and discover exclusive discounts and deals every week.",
      gradient: "from-teal-600 via-emerald-600 to-green-600",
      count: "50%",
      label: "Max Discount",
    },
    {
      icon: RotateCcw,
      title: "Hassle-Free Returns",
      description:
        "Not satisfied with your purchase? Our hassle-free return policy ensures you get the best service every time.",
      gradient: "from-green-600 via-yellow-600 to-orange-600",
      count: "7 Days",
      label: "Return Policy",
    },
  ];
    return (
        <div>
            <section className="py-15 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose BookBazzar?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the best book shopping with our premium features and
              services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`relative bg-gradient-to-br ${feature.gradient} p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 group-hover:shadow-3xl`}
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 mx-auto">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Stats */}
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-white mb-1">
                        {feature.count}
                      </div>
                      <div className="text-white/80 text-sm">
                        {feature.label}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white text-center mb-3">
                      {feature.title}
                    </h3>

                    {/* Description - Shows on hover */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        hoveredCard === index
                          ? "opacity-100 max-h-40"
                          : "opacity-0 max-h-0"
                      }`}
                    >
                      <p className="text-white/90 text-sm text-center leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
        </div>
    );
};

export default Features;