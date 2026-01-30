import StatCard from "../components/Dashboard/StatCard";
import { FiPackage, FiShoppingCart, FiStar, FiUser, FiTrendingUp } from "react-icons/fi";
import Order from "../components/Dashboard/Order.jsx";

const Dashboard = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your store overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up">
          <StatCard icon={FiPackage} title="Total Products" value="245" />
          <StatCard icon={FiShoppingCart} title="Total Orders" value={128} />
          <StatCard icon={FiUser} title="Total Users" value={573} />
          <StatCard icon={FiStar} title="Average Rating" value={4.8} />
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Section Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-teal-100 rounded-lg">
                <FiTrendingUp className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <p className="text-sm text-gray-600">Latest customer transactions</p>
              </div>
            </div>
          </div>

          {/* Orders Content */}
          <div className="p-6">
            <Order />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
