import React, { useEffect, useState } from "react";
import OrderCard from "../components/Orders/OrderCard.jsx";
import authApliClient from "../services/auth-api-client";
import { FiPackage, FiHome, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await authApliClient.get("/orders/");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
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
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8 animate-fade-in-up">
          <Link to="/" className="flex items-center gap-1 hover:text-teal-600 transition">
            <FiHome className="w-4 h-4" />
            Home
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Orders</span>
        </div>

        {/* Page Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-teal-100 rounded-xl">
              <FiPackage className="w-8 h-8 text-teal-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Your Orders</h1>
              <p className="text-gray-600">Manage and track your purchases</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 font-medium">{error}</p>
            <p className="text-red-600 text-sm mt-2">Please try refreshing the page</p>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6 animate-fade-in-up">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onCancel={handleCancelOrder}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="mb-4">
              <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <Link 
              to="/shop" 
              className="inline-block bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-8 py-3 rounded-lg transition transform hover:scale-105"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;
