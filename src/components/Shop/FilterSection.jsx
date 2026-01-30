import { FiSliders, FiX } from "react-icons/fi";
import { useState } from "react";

const FilterSection = ({
  priceRange,
  handlePriceChange,
  categories,
  selectedCategory,
  handleCategoryChange,
  searchQuery,
  handleSearchQuery,
  sortOrder,
  handleSortOrder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const resetFilters = () => {
    handlePriceChange(0, 0);
    handlePriceChange(1, 1000);
    handleCategoryChange("");
    handleSearchQuery("");
    handleSortOrder("");
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition w-full justify-center"
        >
          <FiSliders className="w-5 h-5" />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block mb-8 bg-white rounded-xl shadow-lg p-6 space-y-6 animate-fade-in-up`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FiSliders className="w-5 h-5 text-teal-600" />
            Filters
          </h3>
          <button
            onClick={resetFilters}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium transition"
          >
            Reset All
          </button>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Search Products
          </label>
          <input
            type="text"
            placeholder="Search books, electronics..."
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Price Range
          </label>

          {/* Min Price */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-600">Min:</span>
              <span className="text-sm font-bold text-teal-600">${priceRange[0]}</span>
            </div>
            <input
              type="range"
              min="0"
              max={priceRange[1]}
              step="50"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          {/* Max Price */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-600">Max:</span>
              <span className="text-sm font-bold text-teal-600">${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min={priceRange[0]}
              max="1000"
              step="50"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          {/* Price Display */}
          <div className="bg-teal-50 rounded-lg p-3 text-center border border-teal-200">
            <span className="text-sm font-bold text-teal-900">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition bg-white"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Sort By
          </label>
          <select
            value={sortOrder}
            onChange={(e) => handleSortOrder(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition bg-white"
          >
            <option value="">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Active Filters Display */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <div className="bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full flex items-center gap-2">
                <span>{categories?.find(c => c.id === selectedCategory)?.name}</span>
                <button
                  onClick={() => handleCategoryChange("")}
                  className="hover:text-teal-900"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}
            {searchQuery && (
              <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center gap-2">
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => handleSearchQuery("")}
                  className="hover:text-blue-900"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}
            {sortOrder && (
              <div className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full flex items-center gap-2">
                <span>{sortOrder}</span>
                <button
                  onClick={() => handleSortOrder("")}
                  className="hover:text-orange-900"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSection;
