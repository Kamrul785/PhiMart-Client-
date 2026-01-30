import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiCheckCircle, FiPackage, FiHome } from "react-icons/fi";

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-gradient-to-br from-green-50 via-white to-teal-50 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center animate-fade-in-up">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <FiCheckCircle className="w-24 h-24 text-green-600 relative" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 text-lg mb-8">
          Your order has been confirmed and will be processed soon.
        </p>

        {/* Order Details */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-left p-3 bg-green-50 rounded-lg">
              <FiPackage className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600">Order Status</p>
                <p className="text-sm font-semibold text-gray-900">Confirmed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left p-3 bg-blue-50 rounded-lg">
              <FiHome className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600">Next Step</p>
                <p className="text-sm font-semibold text-gray-900">View your order</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Link
            to="/orders"
            className="block w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105 active:scale-100"
          >
            View Order Details
          </Link>
          <Link
            to="/dashboard"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Auto Redirect Info */}
        <p className="text-sm text-gray-600">
          Redirecting to dashboard in <span className="font-bold text-teal-600">{countdown}s</span>...
        </p>

        {/* Footer Message */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            A confirmation email has been sent to your registered email address. Thank you for your purchase!
          </p>
        </div>
      </div>
    </main>
  );
};

export default PaymentSuccess;
