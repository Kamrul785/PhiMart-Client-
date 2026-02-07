import React, { useState } from "react";
import { FiCheck, FiMinus, FiPlus, FiShoppingCart, FiAlertCircle } from "react-icons/fi";
import useCartContext from "../../hook/useCartContext";

const AddToCartButton = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { AddCartItems } = useCartContext();

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    setIsAdding(true);
    try {
      await AddCartItems(product.id, quantity);
      setIsAdded(true);
      await refreshCart();
      setIsAdding(false);
      // Reset added state after 2 seconds
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.log(error);
      setIsAdding(false);
    }
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="space-y-4 w-full">
      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 block">Select Quantity</label>
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 w-full sm:w-auto">
          <button
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition text-teal-600 hover:text-teal-700"
            aria-label="Decrease quantity"
          >
            <FiMinus className="w-5 h-5" />
          </button>
          <input
            type="number"
            value={quantity}
            min="1"
            max={product.stock}
            readOnly
            className="w-12 text-center font-semibold text-gray-800 bg-transparent outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            onClick={increaseQuantity}
            disabled={quantity >= product.stock}
            className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition text-teal-600 hover:text-teal-700"
            aria-label="Increase quantity"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Stock Available: <span className="font-semibold text-gray-700">{product.stock}</span>
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        disabled={isAdding || isAdded || isOutOfStock}
        className={`w-full py-3 px-6 font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg ${
          isOutOfStock
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : isAdded
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white hover:shadow-lg active:scale-95"
        }`}
      >
        {isOutOfStock ? (
          <>
            <FiAlertCircle className="w-5 h-5" />
            <span>Out of Stock</span>
          </>
        ) : isAdding ? (
          <>
            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            <span>Adding...</span>
          </>
        ) : isAdded ? (
          <>
            <FiCheck className="w-5 h-5" />
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <FiShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </>
        )}
      </button>

      {/* Stock Warning */}
      {!isOutOfStock && product.stock < 5 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
          <FiAlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">
            Only <span className="font-semibold">{product.stock} items</span> left in stock!
          </p>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
