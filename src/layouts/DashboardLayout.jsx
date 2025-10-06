import { useState } from "react";
import { FiPackage, FiShoppingCart, FiStar, FiUser } from "react-icons/fi";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggoleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="drawer lg:drawer-open">
      {/* Mobile Drawer checkbox  */}
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggoleSidebar}
      />
      {/* page content  */}
      <div className="drawer-content flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      {/* sidebar  */}
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
