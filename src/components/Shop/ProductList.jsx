import ProductItem from "../Products/ProductItem";

const ProductList = ({ products, loading }) => {
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <span className="loading loading-spinner text-secondary loading-xl "></span>
      </div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
