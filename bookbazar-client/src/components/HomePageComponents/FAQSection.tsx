import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion =  (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What types of books do you sell?",
      answer:
        "We offer a wide range of books including fiction, non-fiction, academic textbooks, e-books, and more, covering various genres and topics.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes, we offer free shipping on select orders. Check the shipping details during checkout for more information.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order is dispatched, you will receive a tracking number via email to track your order's delivery status.",
    },
    {
      question: "Can I return a book?",
      answer:
        "Yes, we accept returns within 30 days of purchase, provided the book is in its original condition. Please visit our returns page for more details.",
    },
    {
      question: "Do you offer gift cards?",
      answer:
        "Yes, we offer gift cards that can be used to buy books or merchandise from our store. You can purchase them on our website.",
    },
    {
      question: "How can I make a payment?",
      answer:
        "We accept various payment methods including credit/debit cards, PayPal, and other secure online payment options.",
    },
   
   
  ];

  return (
    <div className=" text-white px-8 min-h-screen  bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] mt-10 rounded-3xl mb-10">
      {/* Section Title */}

      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Side Menu */}

        <div className="flex-1 w-full  space-y-4">
          <div>
            <h1 className="lg:text-5xl font-semibold mt-8 mb-10">
              Got Questions? <br /> We have got Answers
            </h1>
          </div>

          <div className="space-y-6">
            <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
              • Book Collection
            </div>
            <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
              • Shipping & Delivery
            </div>
            <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
              • Returns & Refunds
            </div>
            <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
              • Payment Methods
            </div>
            <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
              • Gift Cards & Bulk Orders
            </div>
            <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
              • E-books & Audiobooks
            </div>
            <div className="text-[#9FA3AA] text-lg lg:text-2xl font-normal lg:font-semibold">
              • Customer Support
            </div>
          </div>
        
        </div>

        {/* Right Side Accordion */}
        <div className="w-full flex-1 lg:mt-20 md:mt-0 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-700">
              <button
                className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg">{faq.question}</span>
                <span className="text-yellow-500">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </button>
              {openIndex === index && (
                <p className="text-gray-400 pb-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
