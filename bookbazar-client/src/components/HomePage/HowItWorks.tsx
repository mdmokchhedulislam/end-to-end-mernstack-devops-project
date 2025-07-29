import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      title: "Book a Call",
      description:
        "Schedule a consultation call with our experts to discuss your business needs and goals. We'll understand your requirements and provide initial guidance on how BookBazzar can help scale your business effectively.",
      icon: "📞",
    },
    {
      title: "Requirement Analysis",
      description:
        "Our team conducts a thorough analysis of your business requirements, target audience, and market positioning. We identify key opportunities and create a customized strategy tailored to your specific needs.",
      icon: "📊",
    },
    {
      title: "Service Customisation",
      description:
        "Based on the analysis, we customize our services to perfectly align with your business objectives. Every solution is tailored to ensure maximum impact and sustainable growth for your business.",
      icon: "⚙️",
    },
    {
      title: "Quality Assurance",
      description:
        "We implement rigorous quality assurance processes to ensure that every deliverable meets our high standards. Our QA team thoroughly tests and validates all solutions before delivery.",
      icon: "✅",
    },
    {
      title: "Delivery and Support",
      description:
        "The final product is delivered to the customer. BookBazzar provides ongoing support and 24/7 customer service to ensure that your business continues to thrive and scale effectively.",
      icon: "🚀",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <section className="py-15 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our simple 5-step process to help you find and get your perfect
              books
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden transition-all duration-500 ${
                  activeIndex === index
                    ? "shadow-2xl scale-105"
                    : "hover:bg-white/10"
                }`}
              >
                <div
                  className="flex items-center justify-between p-6 sm:p-8 cursor-pointer group"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center gap-6">
                    {/* Step Icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                      {step.icon}
                    </div>

                    {/* Step Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-purple-400 font-bold text-sm">
                          STEP {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Toggle Icon */}
                  <div className="flex-shrink-0 text-white/70 group-hover:text-white transition-colors">
                    {activeIndex === index ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {activeIndex === index && (
                  <div className="px-6 sm:px-8 pb-8 transition-all duration-500">
                    <div className="ml-22 max-w-3xl">
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/all-product"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
