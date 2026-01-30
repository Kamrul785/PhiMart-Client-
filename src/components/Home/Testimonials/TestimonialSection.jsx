import TestimonialCard from "./TestimonialCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Verified Buyer",
      content: "Amazing quality products and incredibly fast shipping! PhiMart has become my go-to place for all my shopping needs.",
      rating: 5,
      image: "https://img.daisyui.com/images/stock/photo-1535632066927-ab7c9ab60908.webp"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Regular Customer",
      content: "Great selection, competitive prices, and excellent customer service. The browsing experience is smooth and enjoyable.",
      rating: 5,
      image: "https://img.daisyui.com/images/stock/photo-1507003211169-0a1dd7228f2d.webp"
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "Happy Customer",
      content: "Love the variety of products available. The checkout process was seamless and my order arrived perfectly packaged!",
      rating: 5,
      image: "https://img.daisyui.com/images/stock/photo-1494790108377-be9c29b29330.webp"
    },
    {
      id: 4,
      name: "David Martinez",
      role: "Verified Buyer",
      content: "Fantastic experience! The product quality exceeded my expectations and the prices are unbeatable.",
      rating: 5,
      image: "https://img.daisyui.com/images/stock/photo-1507527173427-e0284eb88b11.webp"
    },
  ];

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust PhiMart for quality products and exceptional service
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 snap-center"
                style={{ animationDelay: `${index * 0.1}s` }}>
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex items-center justify-center hidden"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex items-center justify-center hidden"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-3 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-teal-600 transition animate-fade-in-up">
            <p className="text-3xl font-bold text-teal-600 mb-2">50K+</p>
            <p className="text-gray-600 text-sm">Happy Customers</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-teal-600 transition animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-3xl font-bold text-teal-600 mb-2">4.9★</p>
            <p className="text-gray-600 text-sm">Average Rating</p>
          </div>
          <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-teal-600 transition animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-3xl font-bold text-teal-600 mb-2">100%</p>
            <p className="text-gray-600 text-sm">Satisfaction Guarantee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
