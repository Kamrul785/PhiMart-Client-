import { useState } from "react";
import useAuthContext from "../../hook/useAuthContext";
import OrderTable from "./OrderTable";
import authApliClient from "../../services/auth-api-client";

const OrderCard = ({ order, onCancel }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  
  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      const response = await authApliClient.patch(
        `/orders/${order.id}/update_status/`,
        { status: newStatus }
      );
      console.log(response);
      if (response.status === 200) {
        setStatus(newStatus);
        alert(response.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await authApliClient.post("/payment/initiate/", {
        amount: order.total_price,
        orderId: order.id,
        numItems: order.items?.length,
      });
      if (response.data.payment_url) {
        setLoading(false);
        window.location.href = response.data.payment_url;
      } else {
        alert("Payment Failed, try-again Later");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusColors = {
    "Not Paid": "bg-red-100 text-red-800 border border-red-300",
    "Ready To Ship": "bg-yellow-100 text-yellow-800 border border-yellow-300",
    Shipped: "bg-blue-100 text-blue-800 border border-blue-300",
    Delivered: "bg-green-100 text-green-800 border border-green-300",
    Canceled: "bg-gray-100 text-gray-800 border border-gray-300",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow mb-6 overflow-hidden border border-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 sm:p-6 border-b border-teal-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Order #{order.id}</h2>
            <p className="text-sm text-gray-600 mt-1">Placed on {formatDate(order.created_at)}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-wrap">
            {user.is_staff ? (
              <select
                value={status}
                onChange={handleStatusChange}
                className={`px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${statusColors[status]}`}
              >
                <option value="Not Paid">Not Paid</option>
                <option value="Ready To Ship">Ready To Ship</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </select>
            ) : (
              <span className={`px-3 py-2 rounded-lg text-sm font-semibold inline-block ${statusColors[status]}`}>
                {order.status}
              </span>
            )}
            {order.status !== "Delivered" &&
              order.status !== "Canceled" &&
              !user.is_staff && (
                <button
                  onClick={() => onCancel(order.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition px-2 py-2"
                >
                  Cancel Order
                </button>
              )}
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-4 flex items-center gap-2">
          📦 Order Items
        </h3>
        <OrderTable items={order.items} />
      </div>

      {/* Summary Section */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          <div className="flex-1"></div>
          <div className="w-full sm:w-auto sm:max-w-xs space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal:</span>
              <span className="font-medium text-gray-800">${order.total_price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping:</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-base sm:text-lg font-bold border-t border-gray-200 pt-3 text-gray-900">
              <span>Total:</span>
              <span className="text-teal-600">${order.total_price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {!user.is_staff && order.status === "Not Paid" && (
          <button
            className="mt-4 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                Processing Payment
              </>
            ) : (
              <>
                💳 Pay Now
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
