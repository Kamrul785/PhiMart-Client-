import { Link, useParams } from "react-router";
import AddToCartButton from "../components/ProductDetails/AddToCartButton";
import { FiHome, FiChevronRight, FiStar, FiTruck, FiShield, FiRotateCcw } from "react-icons/fi";
import { Suspense, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import ProductImageGallery from "../components/ProductDetails/ProductImageGallery.jsx";
import ReviewSection from "../components/Reviews/ReviewSection.jsx";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/products/${productId}/`).then((res) => {
      setProduct(res.data);
      console.log(res.data);
      setLoading(false);
    });
  }, [productId]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  if (!product) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <Link to="/shop" className="text-teal-600 hover:text-teal-700 font-medium">Back to Shop</Link>
      </div>
    </div>
  );

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 animate-fade-in-up">
          <Link to="/" className="flex items-center gap-1 hover:text-teal-600 transition">
            <FiHome className="w-4 h-4" />
            Home
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-teal-600 transition">Shop</Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-fade-in-up">
          {/* Image Gallery */}
          <div>
            <Suspense
              fallback={
                <div className="aspect-square bg-gray-200 animate-pulse rounded-2xl"></div>
              }
            >
              <ProductImageGallery
                images={product?.images}
                productName={product.name}
              />
            </Suspense>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-600">(125 reviews)</span>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-teal-600">${product.price}</span>
                <span className="text-lg text-gray-500 line-through">${(product.price * 1.15).toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                ${product.price_with_tax} incl. tax
              </p>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">Availability:</span>
                {product.stock > 0 ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <AddToCartButton product={product} />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                <FiTruck className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-900">Free Shipping</div>
                <div className="text-xs text-gray-600">On orders over $50</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                <FiShield className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-900">Secure</div>
                <div className="text-xs text-gray-600">100% Secure Checkout</div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                <FiRotateCcw className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-900">Returns</div>
                <div className="text-xs text-gray-600">30-day guarantee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <ReviewSection />
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
