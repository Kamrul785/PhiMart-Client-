import { useState } from "react";
import { FiPackage, FiShoppingCart, FiStar, FiUser } from "react-icons/fi";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed on Desktop, Drawer on Mobile */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-gray-900 to-gray-800
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:block overflow-y-auto
        `}
      >
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full lg:w-auto">
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
