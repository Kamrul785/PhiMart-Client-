import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

// Map UI-friendly sort values to backend ordering parameter values
const mapSortOrderToOrdering = (sortOrder) => {
  const sortMap = {
    'price_asc': 'price',
    'price_desc': '-price',
    'newest': '-created_at',
    'rating': '-rating',
  };
  return sortMap[sortOrder] || sortOrder;
};

const useFetchProducts = (
  currentPage,
  priceRange,
  selectedCategory,
  searchQuery,
  sortOrder,
) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const ordering = mapSortOrderToOrdering(sortOrder);
      const url = `/products/?price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&&page=${currentPage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${ordering}`;
      try {
        const response = await apiClient.get(url);
        const data = await response.data;
        setProducts(data.results);
        setTotalPages(Math.ceil(data.count / data.results.length));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, priceRange, selectedCategory, searchQuery,sortOrder]);
  return { products, loading, totalPages };
};

export default useFetchProducts;
