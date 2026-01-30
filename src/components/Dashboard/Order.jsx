import { useEffect, useState } from "react";
import authApliClient from "../../services/auth-api-client";
import useAuthContext from "../../hook/useAuthContext";
import OrderRow from "../Orders/OrderRow";
import { FiTrendingUp, FiPackage } from "react-icons/fi";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    authApliClient.get("/orders/").then((res) => {
      setOrders(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="p-2.5 bg-teal-100 rounded-lg">
          <FiTrendingUp className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
          <p className="text-xs text-gray-600">Latest {orders.length} transactions</p>
        </div>
      </div>

      {/* Table */}
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Order ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Customer</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-teal-600">#{order.id}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <OrderRow order={order} />
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-900">
                    ${order.total_price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No orders yet</p>
        </div>
      )}
    </div>
  );
};

export default Order;
