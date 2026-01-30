import { Link } from "react-router";
import defaultImage from "../../assets/default_product.jpg";
import { FiStar, FiShoppingCart, FiEye } from "react-icons/fi";
import { useState } from "react";

const ProductItem = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate average rating (mock data - replace with actual API data)
  const averageRating = product.reviews_count > 0 
    ? (product.total_rating / product.reviews_count).toFixed(1)
    : 0;

  const reviewCount = product.reviews_count || 0;
  const stockStatus = product.stock > 0 ? "In Stock" : "Out of Stock";
  const isLowStock = product.stock > 0 && product.stock < 5;

  return (
    <Link to={`/shop/${product.id}`}>
      <div
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 h-48 md:h-56">
          <img
            src={
              product.images.length > 0 ? product.images[0].image : defaultImage
            }
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between">
            {isLowStock && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Low Stock
              </span>
            )}
            {product.discount && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full ml-auto">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="absolute bottom-3 left-3">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {stockStatus}
            </span>
          </div>

          {/* Overlay Actions */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 animate-fade-in">
              <Link
                to={`/shop/${product.id}`}
                className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                title="Quick View"
              >
                <FiEye className="w-5 h-5" />
              </Link>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                title="Add to Cart"
              >
                <FiShoppingCart className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-5 flex flex-col">
          {/* Product Name */}
          <h3 className="text-gray-900 font-semibold text-sm md:text-base line-clamp-2 mb-2 hover:text-teal-600 transition">
            {product.name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">
              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-3 flex-grow">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg md:text-xl font-bold text-teal-600">
              ${product.price}
            </span>
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.original_price}
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2">
            <Link
              to={`/shop/${product.id}`}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-sm md:text-base font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
            >
              View Details
            </Link>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300">
              ♡
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
