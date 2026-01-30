import { Link } from "react-router";
import { FiArrowRight, FiShoppingCart } from "react-icons/fi";
import bgImg from "../../../assets/images/banner-image-bg.jpg";

const CarouselSlide = ({ title, subtitle, image }) => {
  return (
    <section
      className="w-full min-h-96 sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] bg-cover bg-center flex items-center px-4 sm:px-6 md:px-8 relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>

      <div className="max-w-7xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative z-10 py-8 sm:py-12 gap-8">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left animate-fadeInUp">
          {/* Badge */}
          <div className="inline-block mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-teal-600 to-teal-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg">
              🔥 Limited Time Offer
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight break-words">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-100 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <Link
              to="/shop"
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <FiShoppingCart className="w-5 h-5" />
              Shop Now
            </Link>
            <Link
              to="/shop"
              className="border-2 border-white text-white hover:bg-white/20 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Learn More
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust Info */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 text-white text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">✓</span>
              <span>Free Shipping on Orders Over $100</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">✓</span>
              <span>30-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            className="w-full h-auto max-w-sm drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
            src={image}
            alt={title}
          />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-teal-500/20 rounded-full blur-3xl animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse hidden lg:block"></div>
    </section>
  );
};

export default CarouselSlide;