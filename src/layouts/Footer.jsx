import { Link } from "react-router";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-400 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center md:flex md:items-center md:justify-between">
            <div className="md:flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Stay Updated with PhiMart
              </h2>
              <p className="text-teal-100">Get the latest deals, new products, and exclusive offers!</p>
            </div>
            <div className="mt-6 md:mt-0 md:flex-1 md:ml-8">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white hover:bg-gray-100 text-teal-600 font-bold px-6 py-3 rounded-lg transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Φ</span>
              </div>
              <h3 className="text-xl font-bold text-white">PhiMart</h3>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Your one-stop shop for quality products at unbeatable prices. We're committed to bringing you the best shopping experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition transform hover:scale-110">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition transform hover:scale-110">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition transform hover:scale-110">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition transform hover:scale-110">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h4 className="font-bold text-white mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-teal-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-teal-400 transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-teal-400 transition">
                  Orders
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-bold text-white mb-6 text-lg">Customer Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="font-bold text-white mb-6 text-lg">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FiPhone className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">support@phimart.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Commerce St, City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <p>
            &copy; {currentYear} <span className="text-teal-400 font-bold">PhiMart</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-teal-400 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-teal-400 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
