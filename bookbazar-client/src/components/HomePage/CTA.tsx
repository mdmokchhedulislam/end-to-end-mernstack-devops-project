import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <div>
            <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg border border-white/20 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Reading?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of book lovers who have found their perfect reads
              with BookBazzar. Your literary journey begins now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/all-product"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Browse Books Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-purple-500/50 text-purple-300 font-semibold rounded-2xl text-lg transition-all duration-300 hover:bg-purple-500/10 hover:border-purple-400"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default CTA;