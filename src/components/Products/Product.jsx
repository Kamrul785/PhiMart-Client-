import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import ErrorAlert from "../ErrorAlert";
import apiClient from "../../services/api-client";
import { FiTrendingUp } from "react-icons/fi";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/products/")
      .then((res) => setProducts(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <FiTrendingUp className="w-8 h-8 text-teal-600" />
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Trending Products
              </h2>
              <p className="text-sm text-gray-500 mt-1">Featured collection</p>
            </div>
          </div>
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 whitespace-nowrap"
          >
            View All Products
          </a>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin inline-block w-12 h-12 border-4 border-gray-200 border-t-teal-600 rounded-full"></div>
            <p className="ml-4 text-gray-600 font-medium">Loading products...</p>
          </div>
        )}

        {/* Error Alert */}
        {error && <ErrorAlert error={error} />}

        {/* Products Slider */}
        {!isLoading && !error && products.length > 0 && (
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
              }}
              navigation={{
                prevEl: ".swiper-button-prev-trending",
                nextEl: ".swiper-button-next-trending",
              }}
              className="mt-8"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="flex justify-center">
                  <ProductItem product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
              className="swiper-button-prev-trending absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 bg-white hover:bg-teal-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
              aria-label="Previous products"
            >
              <svg
                className="w-6 h-6 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="swiper-button-next-trending absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 bg-white hover:bg-teal-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
              aria-label="Next products"
            >
              <svg
                className="w-6 h-6 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-300 text-6xl mb-4">📦</div>
            <p className="text-lg text-gray-600 font-medium">No Products Available Yet</p>
            <p className="text-sm text-gray-500 mt-2">Check back soon for new trending items!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Product;
