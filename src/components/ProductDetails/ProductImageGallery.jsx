import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import defaultImage from "../../assets/default_product.jpg";

const ProductImageGallery = ({ images, productName }) => {
  const [thumbsSwiper] = useState(null);
  const displayImages = images.length > 0 ? images : [{ image: defaultImage }];

  return (
    <div className="w-full space-y-4">
      {/* Main Image Slider */}
      <div className="rounded-2xl border-2 border-gray-100 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className="product-main-slider aspect-square"
        >
          {displayImages.map((imageObj, index) => (
            <SwiperSlide key={index} className="bg-gray-50">
              <div className="h-full w-full flex items-center justify-center p-4">
                <img
                  src={imageObj.image}
                  alt={`${productName} - Image ${index + 1}`}
                  className="h-full w-full object-contain max-h-96 sm:max-h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-3 sm:px-4">
          <button
            className="swiper-button-prev-custom pointer-events-auto bg-white hover:bg-gray-100 rounded-full p-2 shadow-md transition-all hover:shadow-lg active:scale-95"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="swiper-button-next-custom pointer-events-auto bg-white hover:bg-gray-100 rounded-full p-2 shadow-md transition-all hover:shadow-lg active:scale-95"
            aria-label="Next image"
          >
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image Counter */}
      <div className="text-center text-xs sm:text-sm text-gray-500">
        <span className="font-medium text-gray-700">{displayImages.length}</span> Image{displayImages.length !== 1 ? 's' : ''} Available
      </div>
    </div>
  );
};

export default ProductImageGallery;
