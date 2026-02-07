import { FiMenu, FiX, FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../../hook/useAuthContext";
import { useState } from "react";

const Navbar = ({ sidebarOpen }) => {
  const { user, logoutUser } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left - Hamburger & Title */}
        <div className="flex items-center gap-4">
          <label htmlFor="drawer-toggle" className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer">
            {sidebarOpen ? (
              <FiX className="w-5 h-5 text-gray-700" />
            ) : (
              <FiMenu className="w-5 h-5 text-gray-700" />
            )}
          </label>
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        </div>

        {/* Right - User Profile */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-900">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-gray-600">
                {user?.is_staff ? 'Admin' : 'Customer'}
              </p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                onClick={() => setDropdownOpen(false)}
              >
                <FiUser className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                onClick={() => setDropdownOpen(false)}
              >
                <FiSettings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <hr className="my-2" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition text-left"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;