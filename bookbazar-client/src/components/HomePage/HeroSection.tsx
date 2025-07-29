import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div>
             <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="my-8">
          
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your Literary
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Adventure Starts Here
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover thousands of books, from bestsellers to hidden gems. Your
              next favorite story is just a click away.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center ">
            <Link
              to="/all-product"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Books{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>
        </div>
    );
};

export default HeroSection;