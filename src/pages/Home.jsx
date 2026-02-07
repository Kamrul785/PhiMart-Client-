import HeroCarousel from "../components/Home/Carousel/HeroCarousel.jsx";
import Category from "../components/Home/Categories/Category.jsx";
import DiscountSection from "../components/Home/Discount/DiscountSection.jsx";
import Features from "../components/Home/Features.jsx";
import Product from "../components/Products/Product.jsx";
import TestimonialSection from "../components/Home/Testimonials/TestimonialSection.jsx";
import FAQSection from "../components/Home/FAQ/FAQSection.jsx";
import FeaturedCollections from "../components/Home/FeaturedCollections/FeaturedCollections.jsx";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <Category />
      <FeaturedCollections />
      <Product />
      <DiscountSection />
      <TestimonialSection />
      <FAQSection />
    </div>
  );
};

export default Home;