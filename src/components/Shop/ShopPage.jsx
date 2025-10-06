import React, { useState } from "react";
import ProductList from "./ProductList";
import Paginations from "./Paginations";
import useFetchProducts from "../../hook/useFetchProducts";
import FilterSection from "./FilterSection";
import useFetchCategories from "../../hook/useFetchCategories";
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>
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
      <ProductList products={products} loading={loading} />
      <Paginations
        totalPages={totalPages}
        currentPage={currentPage}
        handleCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ShopPage;
