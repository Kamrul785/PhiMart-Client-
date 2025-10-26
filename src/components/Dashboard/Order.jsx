import { useEffect, useState } from "react";
import authApliClient from "../../services/auth-api-client";
import useAuthContext from "../../hook/useAuthContext";
import OrderRow from "../Orders/OrderRow";

const Order = () => {
  const [orders, setOrders] = useState();
  const { user } = useAuthContext();
  useEffect(() => {
    authApliClient.get("/orders/").then((res) => setOrders(res.data));
  }, []);
  return (
    <div className="mt-6 card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr>
                  <td>{order.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>
                    <div className="badge badge-success">{order.status}</div>
                  </td>
                  <td>
                    <OrderRow order={order} />
                  </td>
                  <td>{order.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
