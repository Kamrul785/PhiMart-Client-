import { Link, useNavigate } from "react-router";
import useAuthContext from "../hook/useAuthContext";
import useCart from "../hook/useCart";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Logo from "../assets/images/Phimart_logo.png";

const Navbar = ({ toggleSidebar }) => {
  const { user, logoutUser } = useAuthContext();
  const { cart, refreshTrigger } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.startsWith("/dashboard");

  // Sync cart item count with cart changes
  useEffect(() => {
    setCartItemCount(cart?.items?.length || 0);
  }, [cart, refreshTrigger]);

  const categories = [
    { name: "Electronics", subcategories: ["Phones", "Laptops", "Accessories"] },
    { name: "Fashion", subcategories: ["Men", "Women", "Kids"] },
    { name: "Home & Garden", subcategories: ["Furniture", "Decor", "Appliances"] },
    { name: "Sports", subcategories: ["Equipment", "Apparel", "Shoes"] },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Section - Logo / Menu Button */}
          <div className="flex items-center gap-4">
            {isDashboard && (
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition"
                aria-label="Toggle sidebar"
              >
                <FiMenu className="w-6 h-6" />
              </button>
            )}

            <Link to="/" className="flex items-center gap-2 group">
              {/* <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Φ</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent hidden sm:inline">
                PhiMart
              </span> */}
              <div className="w-34">
                <img src={Logo} alt="PhiMart Logo" />
              </div>
            </Link>
          </div>

          {/* Center Menu - Hidden on Dashboard */}
          {!isDashboard && (
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium transition">
                Home
              </Link>

              {/* Mega Menu for Categories */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-teal-600 font-medium transition flex items-center gap-1">
                  Categories
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* Mega Menu Dropdown */}
                <div className="absolute left-0 mt-0 w-screen max-w-md bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top">
                  <div className="p-6 grid grid-cols-2 gap-6">
                    {categories.map((cat) => (
                      <div key={cat.name}>
                        <h3 className="font-bold text-teal-600 mb-3">{cat.name}</h3>
                        <ul className="space-y-2">
                          {cat.subcategories.map((subcat) => (
                            <li key={subcat}>
                              <a href="#" className="text-gray-600 hover:text-teal-600 text-sm transition">
                                {subcat}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/shop" className="text-gray-700 hover:text-teal-600 font-medium transition">
                Shop
              </Link>
            </div>
          )}

          {/* Right Side - Cart & Auth */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            {user && (
              <div className="relative group hidden sm:block">
                <button className="relative p-2 text-gray-700 hover:text-teal-600 transition">
                  <FiShoppingCart className="w-6 h-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>

                {/* Enhanced Cart Dropdown */}
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top">
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {cart?.items?.length > 0 ? (
                      <>
                        <h3 className="font-bold text-gray-900 mb-4">Your Cart</h3>
                        <div className="space-y-3 mb-4">
                          {cart.items.map((item) => (
                            <div key={item.id} className="flex gap-3 pb-3 border-b">
                              {item.product?.image && (
                                <img
                                  src={item.product.image}
                                  alt={item.product?.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              )}
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{item.product?.name}</p>
                                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                <p className="text-sm font-semibold text-teal-600">${(item.product?.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-4 space-y-3">
                          <div className="flex justify-between font-bold">
                            <span>Subtotal:</span>
                            <span>${cart.total_price?.toFixed(2) || 0}</span>
                          </div>
                          <Link to="/dashboard/cart/" className="btn btn-primary w-full btn-sm">
                            View Cart
                          </Link>
                        </div>
                      </>
                    ) : (
                      <p className="text-center text-gray-600 py-8">Your cart is empty</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* User Menu */}
            {user ? (
              <div className="relative group hidden sm:block">
                <button className="flex items-center gap-2 p-2 text-gray-700 hover:text-teal-600 transition">
                  <FiUser className="w-6 h-6" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top">
                  <div className="p-4 space-y-2">
                    {/* <p className="text-sm text-gray-600 mb-3">{user.email}</p> */}
                    <Link to="/dashboard/profile" className="block text-gray-700 hover:text-teal-600 py-2 transition">
                      Profile
                    </Link>
                    <Link to="/dashboard" className="block text-gray-700 hover:text-teal-600 py-2 transition">
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logoutUser();
                        navigate("/login");
                      }}
                      className="w-full text-left text-gray-700 hover:text-red-600 py-2 transition cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex gap-2">
                <Link to="/login" className="btn btn-primary btn-sm px-2 py-1 text-white rounded-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm px-2 py-1 text-white rounded-sm">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button - Hidden on Dashboard */}
            {!isDashboard && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-teal-600"
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu - Hidden on Dashboard */}
        {!isDashboard && mobileMenuOpen && (
          <div className="lg:hidden border-t bg-gray-50 py-4 animate-fadeInUp">
            <div className="space-y-2 px-2">
              <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 rounded">
                Home
              </Link>
              {/* <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100 rounded font-medium">
                Categories
              </button>
              {categories.map((cat) => (
                <div key={cat.name} className="ml-4 space-y-1">
                  <p className="text-sm text-teal-600 font-medium">{cat.name}</p>
                  {cat.subcategories.map((subcat) => (
                    <a
                      key={subcat}
                      href="#"
                      className="block text-sm text-gray-600 hover:text-teal-600 py-1 pl-2"
                    >
                      {subcat}
                    </a>
                  ))}
                </div>
              ))} */}
              <Link to="/shop" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 rounded">
                Shop
              </Link>

              {user ? (
                <>
                  <Link to="/dashboard/cart/" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 rounded">
                    Cart ({cartItemCount})
                  </Link>
                  <Link to="/dashboard/profile" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 rounded">
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logoutUser();
                      setMobileMenuOpen(false);
                      navigate("/login");
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2">
                  <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-teal-100 rounded">
                    Login
                  </Link>
                  <Link to="/register" className="block px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
