import { useState } from "react";
import { useNavigate } from "react-router";
import authApliClient from "../../services/auth-api-client";
import { FiShield, FiTruck, FiRotateCcw } from "react-icons/fi";
import { useState } from "react";

const CartSummary = ({ totalPrice, itemCount, cartId }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = itemCount == 0 || parseFloat(totalPrice) > 100 ? 0 : 10;
  const tax = parseFloat(totalPrice) * 0.1;
  const orderTotal = parseFloat(totalPrice) + tax + shipping;

  const deleteCart = () => {
    localStorage.removeItem("cartId");
  };

  const createOrder = async () => {
    if (itemCount === 0) {
      setError("Your cart is empty. Add items before checkout.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      setIsProcessing(true);
      const order = await authApliClient.post("/orders/", { cart_id: cartId });
      if (order.status === 201) {
        deleteCart();
        await createOrGetCart();
        alert("Order Created Successfully");
        setTimeout(() => {
          navigate("/dashboard/orders");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 animate-fade-in-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-400 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Order Summary</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold text-gray-900">${parseFloat(totalPrice).toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              Shipping
              {shipping === 0 && <span className="text-green-600 text-sm font-medium"> (FREE)</span>}
            </span>
            <span className="font-semibold text-gray-900">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Order Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                ${orderTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Free Shipping Info */}
        {parseFloat(totalPrice) < 100 && shipping > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              🎉 <span className="font-semibold">Free shipping</span> on orders over $100!
            </p>
          </div>
        )}

        {/* Checkout Button */}
        <button
          disabled={!itemCount || isProcessing}
          onClick={createOrder}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </span>
          ) : (
            "Proceed to Checkout"
          )}
        </button>

        {/* Continue Shopping */}
        <button className="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-bold py-3 px-4 rounded-lg transition-all duration-300">
          Continue Shopping
        </button>

        {/* Trust Badges */}
        <div className="border-t border-gray-200 pt-6 space-y-3">
          <div className="flex items-start gap-3">
            <FiShield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-gray-900">Secure Checkout</p>
              <p className="text-xs text-gray-600">SSL encrypted payments</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FiTruck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-gray-900">Fast Shipping</p>
              <p className="text-xs text-gray-600">Delivered within 3-5 business days</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FiRotateCcw className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-gray-900">30-Day Returns</p>
              <p className="text-xs text-gray-600">Easy returns and refunds</p>
            </div>
          </div>
        </div>
        {error && (
          <div role="alert" className="alert alert-error mt-4">
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
