

// import { useState } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// const HowToWorks = () => {
//   const steps = [
//     {
//       title: "Book a Call",
//       description:
//         "The final product is delivered to the customer. BookBazzar provides ongoing support and 24/7 customer service to ensure that the customers business continues to thrive and scale effectively",
//     },
//     {
//       title: "Requirement Analysis",
//       description:
//         "The final product is delivered to the customer. BookBazzar provides ongoing support and 24/7 customer service to ensure that the customers business continues to thrive and scale effectively",
//     },
//     {
//       title: "Service Customisation",
//       description:
//         "The final product is delivered to the customer. BookBazzar provides ongoing support and 24/7 customer service to ensure that the customers business continues to thrive and scale effectively",
//     },
//     {
//       title: "Quality Assurance",
//       description:
//         "The final product is delivered to the customer. BookBazzar provides ongoing support and 24/7 customer service to ensure that the customers business continues to thrive and scale effectively",
//     },
//     {
//       title: "Delivery and Support",
//       description:
//         "The final product is delivered to the customer. BookBazzar provides ongoing support and 24/7 customer service to ensure that the customers business continues to thrive and scale effectively",
//     },
//   ];

//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const toggleAccordion = (index: number) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="lg:pt-8 pt-8 text-white bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31]">
//       <div className="text-center lg:pb-14 pb-8">
//         <h2 className="lg:text-6xl text-3xl font-semibold text-white">
//           How To Works?
//         </h2>
//         <p className="text-[#F3F3F4] text-base lg:text-lg font-normal pt-4 mx-auto lg:w-[40rem] w-[90%]">
//           Based on the description of BookBazzar and the image provided, here is
//           a 5-step process that BookBazzar uses to scale a customers business
//         </p>
//       </div>

//       <div className="relative">
//         {steps.map((step, index) => (
//           <div key={index} className="relative pb-4 rounded-2xl">
//             <div
//               className="flex items-center lg:ml-[150px] lg:mr-[150px] justify-between p-4 cursor-pointer"
//               onClick={() => toggleAccordion(index)}
//             >
//               <p className="text-xl lg:text-4xl font-medium">{step.title}</p>
//               {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
//             </div>
//             {activeIndex === index && (
//               <div className="p-4">
//                 <p className="text-base lg:text-xl lg:ml-[150px] lg:mr-[150px] font-normal">
//                   {step.description}
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default HowToWorks;



"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom"

const HowToWorks = () => {
  const steps = [
    {
      title: "Book a Call",
      description:
        "Schedule a consultation call with our experts to discuss your business needs and goals. We'll understand your requirements and provide initial guidance on how BookBazzar can help scale your business effectively.",
    },
    {
      title: "Requirement Analysis",
      description:
        "Our team conducts a thorough analysis of your business requirements, target audience, and market positioning. We identify key opportunities and create a customized strategy tailored to your specific needs.",
    },
    {
      title: "Service Customisation",
      description:
        "Based on the analysis, we customize our services to perfectly align with your business objectives. Every solution is tailored to ensure maximum impact and sustainable growth for your business.",
    },
    {
      title: "Quality Assurance",
      description:
        "We implement rigorous quality assurance processes to ensure that every deliverable meets our high standards. Our QA team thoroughly tests and validates all solutions before delivery.",
    },
    {
      title: "Delivery and Support",
      description:
        "The final product is delivered to the customer. BookBazzar provides ongoing support and 24/7 customer service to ensure that your business continues to thrive and scale effectively.",
    },
  ]

  const [activeIndex, setActiveIndex] = useState<number | null>()

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:w-3/4 w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-6">How It Works?</h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Based on the description of BookBazzar and our proven methodology, here is our 5-step process that we use to
            scale your business effectively
          </p>
        </div>

        {/* Steps Accordion */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10"
            >
              <div
                className="flex items-center justify-between p-6 cursor-pointer group"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-xl  font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>
                </div>
                <div className="flex-shrink-0 text-white/70 group-hover:text-white transition-colors">
                  {activeIndex === index ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </div>
              </div>

              {activeIndex === index && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="ml-16 pr-8">
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link to={"/all-product"} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-4 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HowToWorks
