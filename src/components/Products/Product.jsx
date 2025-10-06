import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import ErrorAlert from "../ErrorAlert";
import apiClient from "../../services/api-client";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isloading, setLoading] = useState(false);
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
    <section className=" bg-gray-50 ">
      <div className="mx-auto py-12 max-w-7xl">
        <div className="flex justify-between items-center px-4 md:px-8 mb-4">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Treanding Product
          </h2>
          <a href="" className="btn btn-secondary rounded-full px-6 py-6">
            View All
          </a>
        </div>

        {/* spinner  */}
        {isloading && (
          <div className="flex justify-center items-center ">
            <span className="loading loading-spinner text-secondary loading-xl "></span>
          </div>
        )}

        {/* error message */}
        {error && <ErrorAlert error={error} />}

        {/* product slider */}

        {!isloading && !error && products.length > 0 && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            className="mt-4 px-4 container "
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="flex justify-center">
                <ProductItem key={product.id} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {!isloading && !error && products.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No Product Available Yet
          </p>
        )}
      </div>
    </section>
  );
};

export default Product;
