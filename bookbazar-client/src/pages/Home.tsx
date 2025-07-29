import BookGenresSection from "../components/HomePage/book-genres-section";
import ReadingBenefitsSection from "../components/HomePage/reading-benefits-section";
import ReadingTipsSection from "../components/HomePage/reading-tips-section";
import ReadingCommunitySection from "../components/HomePage/reading-community-section";
import NewsletterSection from "../components/HomePage/newsletter-section";
import Footer from "../components/Footer";
import FeaturedBooks from "../components/HomePageComponents/FeaturedBooks";
import HeroSection from "../components/HomePage/HeroSection";
import BookCategories from "../components/HomePage/BookCategories";
import HowItWorks from "../components/HomePage/HowItWorks";
import Features from "../components/HomePage/Features";
import CTA from "../components/HomePage/CTA";

// Import the new simple sections

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] fixed top-0 left-0 w-full min-h-screen -z-10"></div>

      {/* Hero Section */}
      <HeroSection />

      <FeaturedBooks />

      {/* Book Genres Section */}
      <BookGenresSection />

      {/* Features Section */}
      <Features />

      {/* Reading Benefits Section */}
      <ReadingBenefitsSection />

      {/* How It Works Section */}

      <HowItWorks />

      {/* Reading Tips Section */}
      <ReadingTipsSection />

      {/* Book Categories Section */}
      <BookCategories />

      {/* Reading Community Section */}
      <ReadingCommunitySection />

      {/* Latest News Section */}
      {/* <LatestNewsSection /> */}
      <NewsletterSection />

      {/* CTA Section */}
      <CTA />

      <Footer />
    </div>
  );
};

export default Home;
