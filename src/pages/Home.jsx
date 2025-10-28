import HeroCarousel from "../components/Home/Carousel/HeroCarousel.jsx";
import Category from "../components/Home/Categories/Category.jsx";
import DiscountSection from "../components/Home/Discount/DiscountSection.jsx";
import Features from "../components/Home/Features.jsx";
import Product from "../components/Products/Product.jsx";


const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <Category />
      <Product />
      <DiscountSection />
    </div>
  );
};

export default Home;