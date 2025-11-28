import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiShoppingBag,
  FiShoppingCart,
  FiStar,
  FiTag,
  FiUsers,
  FiHome,
} from "react-icons/fi";
import { Link, useLocation } from "react-router";
import useAuthContext from "../../hook/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  const CustomerItems = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart" },
    { to: "/dashboard/orders", icon: FiShoppingBag, label: "Orders" },
    { to: "/reviews", icon: FiStar, label: "Reviews" },
  ];

  const AdminItems = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    {
      label: "Products",
      items: [
        { to: "/products", icon: FiPackage, label: "All Products" },
        { to: "/dashboard/products/add", icon: FiPlusCircle, label: "Add Product" },
      ],
    },
    {
      label: "Categories",
      items: [
        { to: "/categories", icon: FiTag, label: "All Categories" },
        { to: "/categories/add", icon: FiPlusCircle, label: "Add Category" },
      ],
    },
    { to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart" },
    { to: "/dashboard/orders", icon: FiShoppingBag, label: "Orders" },
    { to: "/reviews", icon: FiStar, label: "Reviews" },
    { to: "/users", icon: FiUsers, label: "Users" },
  ];

  const menuItems = user?.is_staff ? AdminItems : CustomerItems;
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-full h-full bg-gradient-to-b from-white to-gray-50 text-gray-900 shadow-xl flex flex-col border-r border-gray-200">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-md">
            <FiShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">PhiMart</h1>
            <p className="text-xs text-gray-500">
              {user?.is_staff ? "Admin Panel" : "Customer"}
            </p>
          </div>
        </Link>
      </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const hasSubItems = item.items;

            if (hasSubItems) {
              return (
                <div key={index} className="space-y-1">
                  {/* Section Label */}
                  <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </p>
                  {/* Sub Items */}
                  {item.items.map((subItem, subIndex) => {
                    const SubIcon = subItem.icon;
                    return (
                      <Link
                        key={subIndex}
                        to={subItem.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive(subItem.to)
                            ? "bg-teal-500 text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                        }`}
                      >
                        <SubIcon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              );
            }

            return (
              <Link
                key={index}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.to)
                    ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:text-teal-600"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info Section */}
        <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50">
          <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">User Type</p>
            <p className="text-sm font-semibold text-teal-600">
              {user?.is_staff ? "👨‍💼 Administrator" : "👤 Customer"}
            </p>
          </div>
          <a
            href="/"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-teal-600 rounded-lg transition text-sm font-medium border border-gray-200"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </a>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 text-center text-xs text-gray-500 bg-white">
          © 2025 PhiMart
          <br />
          All Rights Reserved
        </div>
      </aside>
  );
};

export default Sidebar;
