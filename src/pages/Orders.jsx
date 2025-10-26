import React, { useEffect, useState } from "react";
import OrderCard from "../components/Orders/OrderCard";
import authApliClient from "../services/auth-api-client";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // 1. Define an async function to fetch data
    const fetchOrders = async () => {
      setLoading(true); // START loading
      setError(null); // Clear previous errors

      try {
        // 2. Await the API response
        const res = await authApliClient.get("/orders/");
        setOrders(res.data);
      } catch (err) {
        // 3. Handle errors if the request fails
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        // 4. STOP loading, always runs after try or catch
        setLoading(false);
      }
    };

    fetchOrders(); // Execute the fetch function
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await authApliClient.post(`/orders/${orderId}/cancel/`);
      console.log(response);
      if (response.status === 200) {
        setOrders((prevOrder) =>
          prevOrder.map((order) =>
            order.id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-2xl font-bold mb-6">Order Detail</h1>

      {/* Show Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner text-secondary loading-xl "></span>
        </div>
      )}

      {/* Show Error Message */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Show Orders (only if not loading and no error) */}
      {!loading &&
        !error &&
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onCancel={handleCancelOrder}
          />
        ))}

      {/* Show message if no orders were found */}
      {!loading && !error && orders.length === 0 && (
        <div className="text-center text-gray-500">No orders found.</div>
      )}
    </div>
  );
};

export default Orders;
