import React, { useState } from "react";
import { Link } from "react-router";
import ProductList from "./ProductList";
import Paginations from "./Paginations";
import useFetchProducts from "../../hook/useFetchProducts";
import FilterSection from "./FilterSection";
import useFetchCategories from "../../hook/useFetchCategories";
import { FiHome, FiChevronRight } from "react-icons/fi";

const ShopPage = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { products, loading, totalPages } = useFetchProducts(
    currentPage,
    priceRange,
    selectedCategory,
    searchQuery,
    sortOrder
  );

  const categories = useFetchCategories();

  const handlePriceChange = (index, value) => {
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 animate-fade-in-up">
            <Link to="/" className="flex items-center gap-1 hover:text-teal-600 transition">
              <FiHome className="w-4 h-4" />
              Home
            </Link>
            <FiChevronRight className="w-4 h-4" />
            <span className="text-teal-600 font-semibold">Shop</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-gray-200 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Shop Our Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our collection of {products?.length || 0} amazing products
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <FilterSection
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                handleSearchQuery={setSearchQuery}
                sortOrder={sortOrder}
                handleSortOrder={setSortOrder}
              />
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <ProductList products={products} loading={loading} />
            <Paginations
              totalPages={totalPages}
              currentPage={currentPage}
              handleCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
