import ProductItem from "../Products/ProductItem";
import { FiPackage } from "react-icons/fi";

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium text-lg">No products found</p>
          <p className="text-gray-500 text-sm">Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      {/* Product Count */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Showing <span className="font-semibold text-gray-900">{products.length}</span> products
      </div>
    </div>
  );
};

export default ProductList;
