import { useState } from "react";
import { useNavigate } from "react-router";
import authApliClient from "../../services/auth-api-client";
import useCartContext from "../../hook/useCartContext";

const CartSummary = ({ totalPrice, itemCount, cartId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
   const { createOrGetCart } = useCartContext();

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
      console.error("Order creation error:", error);
      // Handle specific error cases
      if (error.response?.status === 400) {
        setError(
          error.response.data?.message ||
            "Invalid cart data. Please refresh and try again."
        );
      } else if (error.response?.status === 404) {
        setError("Cart not found. Please refresh the page.");
        deleteCart();
      } else {
        setError("Failed to create order. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal {itemCount} items</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Order Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button
            disabled={!itemCount}
            onClick={createOrder}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <span className="flex items-center">
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Processing....
              </span>
            ) : (
              "Proceed to Checkout"
            )}
          </button>
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
