import bgImg from "../../../assets/images/banner-image-bg-1.jpg";
import image from "../../../assets/images/banner-image3.png";
import DiscountTimer from "./DiscountTimer";
import { Link } from "react-router";

const DiscountSection = () => {
  return (
    <section
      className="w-full min-h-96 sm:min-h-[500px] md:min-h-[600px] bg-cover bg-center flex items-center px-4 sm:px-6 md:px-8 relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="max-w-7xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative z-10 gap-8 py-8 sm:py-12">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            className="w-full h-auto max-w-sm drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
            src={image}
            alt="Special Discount Offer"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg">
              ⚡ Limited Time Sale
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            30% Discount <br className="hidden sm:block" />
            On All Items!
          </h1>

          {/* Subtitle */}
          <p className="text-gray-700 text-base sm:text-lg mb-6 max-w-lg">
            Don't miss out on this incredible offer. Grab your favorite products at unbeatable prices today!
          </p>

          {/* Countdown Timer */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-3 font-medium">Offer expires in:</p>
            <DiscountTimer />
          </div>

          {/* CTA Button */}
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold rounded-lg transition transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-base sm:text-lg"
          >
            🛍️ Shop Products
          </Link>

          {/* Trust Message */}
          <p className="text-xs sm:text-sm text-gray-600 mt-6">
            ✓ Free Shipping on Orders Over $100 | ✓ 30-Day Returns | ✓ Secure Checkout
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-orange-500/20 rounded-full blur-3xl animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse hidden lg:block"></div>
    </section>
  );
};

export default DiscountSection;
