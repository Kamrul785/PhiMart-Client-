import StatCard from "../components/Dashboard/StatCard";
import { FiPackage, FiShoppingCart, FiStar, FiUser } from "react-icons/fi";
import Order from "../components/Dashboard/Order.jsx";

const Dashboard = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FiPackage} title="Total Products" value="245" />
        <StatCard icon={FiShoppingCart} title="Total Orders" value={128} />
        <StatCard icon={FiUser} title="Total Users" value={573} />
        <StatCard icon={FiStar} title="Average Rating" value={4.8} />
      </div>
      <Order  />
    </div>
  );
};

export default Dashboard;
