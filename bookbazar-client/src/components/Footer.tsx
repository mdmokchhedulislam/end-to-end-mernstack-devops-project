// import mail from "../assets/images/mail.png";

// const Footer = () => {
//   return (
//     <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] py-10 rounded-3xl">
//       <div className="text-center px-4 ">
//         <h1 className="lg:text-5xl text-2xl mb-8 font-semibold text-white">
//           Subscribe to Our Newsletter
//         </h1>
//         <p className="lg:text-2xl text-xl mb-8 text-[#F3F3F4] ">
//           Join the 25000+ clients in our community and stay updated with the latest offers, news, and releases.
//         </p>
//       </div>

//       <div className="relative flex w-[343px] lg:w-[600px] h-12  mx-auto justify-center items-center mb-16">
//         <input
//           className="rounded-full text-white w-full h-full px-5 border border-gray-500 bg-transparent"
//           type="text"
//           placeholder="Enter your email"
//         />
//         <button className="absolute right-0  text-sm lg:text-xl text-white font-semibold rounded-full border-2 border-[#C16EFD] bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] py-2 px-6 lg:px-9 flex items-center">
//           Subscribe
//         </button>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-white">
//         {/* Company Section */}
//         <div>
//           <h3 className="text-lg font-bold mb-4">Company</h3>
//           <ul className="space-y-2">
//             {[
//               "Home",
//               "About us",
//               "Team",
//               "User Profile",
//               "White Labelling",
//               "Careers",
//               "Start Earning",
//             ].map((item) => (
//               <li key={item} className="hover:text-yellow-500 cursor-pointer">{item}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Services Section */}
//         <div>
//           <h3 className="text-lg font-bold mb-4">Services</h3>
//           <ul className="space-y-2">
//             {[
//               "Digital Marketing",
//               "Creative Writing Solution",
//               "Web & Software",
//               "E-Commerce Solution",
//               "Graphic Design",
//               "Multimedia & Video Editing",
//               "Buy & Sell",
//               "Merchandise",
//               "Special Combo",
//             ].map((item) => (
//               <li key={item} className="hover:text-yellow-500 cursor-pointer">{item}</li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact Us Section */}
//         <div>
//           <h3 className="text-lg font-bold mb-4">Contact Us</h3>
//           <div className="space-y-6">
//             <div>
//               <p className="text-yellow-500 font-semibold mb-2">Mail:</p>
//               <ul className="space-y-2">
//                 {["official@bookbazzar.com", "hello@bookbazzar.com"].map((email) => (
//                   <li key={email} className="flex items-center gap-2">
//                     <img src={mail} alt="mail icon" className="w-5 h-5" />
//                     <a href={`mailto:${email}`} className="hover:text-yellow-500">{email}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div>
//               <p className="text-yellow-500 font-semibold mb-2">Information:</p>
//               <div className="flex items-center gap-2">
//                 <img src={mail} alt="mail icon" className="w-5 h-5" />
//                 <a href="mailto:info@bookbazzar.com" className="hover:text-yellow-500">
//                   info@bookbazzar.com
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Other Contacts Section */}
//         <div className="space-y-6">
//           <div>
//             <p className="text-yellow-500 font-semibold mb-2">Job Apply:</p>
//             <div className="flex items-center gap-2">
//               <img src={mail} alt="mail icon" className="w-5 h-5" />
//               <a href="mailto:carrear@bookbazzar.com" className="hover:text-yellow-500">
//                 carrear@bookbazzar.com
//               </a>
//             </div>
//           </div>

//           <div>
//             <p className="text-yellow-500 font-semibold mb-2">Directions:</p>
//             <div className="flex items-center gap-2">
//               <img src={mail} alt="mail icon" className="w-5 h-5" />
//               <a href="mailto:director@bookbazzar.com" className="hover:text-yellow-500">
//                 director@bookbazzar.com
//               </a>
//             </div>
//           </div>

//           <div>
//             <p className="text-yellow-500 font-semibold mb-2">White Labelling Related:</p>
//             <div className="flex items-center gap-2">
//               <img src={mail} alt="mail icon" className="w-5 h-5" />
//               <a href="mailto:service@bookbazzar.com" className="hover:text-yellow-500">
//                 service@bookbazzar.com
//               </a>
//             </div>
//           </div>

//           <div>
//             <p className="text-yellow-500 font-semibold mb-2">Service Related:</p>
//             <div className="flex items-center gap-2">
//               <img src={mail} alt="mail icon" className="w-5 h-5" />
//               <a href="mailto:service@bookbazzar.com" className="hover:text-yellow-500">
//                 service@bookbazzar.com
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const companyLinks = [
    "Home",
    "About us",
    "Team",
    "User Profile",
    "White Labelling",
    "Careers",
    "Start Earning",
  ];

  const services = [
    "Digital Marketing",
    "Creative Writing Solution",
    "Web & Software",
    "E-Commerce Solution",
    "Graphic Design",
    "Multimedia & Video Editing",
    "Buy & Sell",
    "Merchandise",
    "Special Combo",
  ];

  const contactEmails = [
    {
      label: "General",
      emails: ["official@bookbazzar.com", "hello@bookbazzar.com"],
    },
    { label: "Information", emails: ["info@bookbazzar.com"] },
    { label: "Job Apply", emails: ["career@bookbazzar.com"] },
    { label: "Directions", emails: ["director@bookbazzar.com"] },
    { label: "White Labelling", emails: ["service@bookbazzar.com"] },
    { label: "Service Related", emails: ["support@bookbazzar.com"] },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Join the 25,000+ clients in our community and stay updated with the
            latest offers, news, and releases.
          </p>

          {/* Newsletter Form */}
          <div className="max-w-2xl mx-auto">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="relative">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full sm:rounded-r-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full sm:rounded-l-none border-2 border-purple-500 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <Mail className="w-6 h-6" />
                  <span className="text-lg font-semibold">
                    Successfully Subscribed!
                  </span>
                </div>
                <p className="text-gray-300 mt-2">
                  Thank you for joining our community!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactEmails.map((contact, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-2xl p-4 border border-white/10"
                >
                  <h4 className="text-purple-400 font-semibold mb-3 text-sm uppercase tracking-wide">
                    {contact.label}
                  </h4>
                  <div className="space-y-2">
                    {contact.emails.map((email) => (
                      <div key={email} className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <a
                          href={`mailto:${email}`}
                          className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm"
                        >
                          {email}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Contact Methods */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-semibold text-sm">
                    Phone Support
                  </span>
                </div>
                <p className="text-gray-300 text-sm">+880 1234-567890</p>
                <p className="text-gray-400 text-xs mt-1">Available 24/7</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-semibold text-sm">
                    Office Address
                  </span>
                </div>
                <p className="text-gray-300 text-sm">Dhaka, Bangladesh</p>
                <p className="text-gray-400 text-xs mt-1">Visit us anytime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold text-white mb-2">BookBazzar</h4>
              <p className="text-gray-400 text-sm">
                Your trusted partner for all book needs
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} BookBazzar. All rights reserved.
              </p>

              <div className="flex gap-4 mt-2 justify-center md:justify-end">
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
