import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router";
import useCartContext from "../hook/useCartContext";
import CartItemList from "../components/Cart/CartItemList.jsx";
import CartSummary from "../components/Cart/CartSummary.jsx";
import { FiHome, FiChevronRight, FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  const {
    cart,
    cartId,
    loading,
    createOrGetCart,
    updateCartItemQuantity,
    deleteCartItems,
  } = useCartContext();

  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    if (!cart && !loading) createOrGetCart();
  }, [createOrGetCart, cart, loading]);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const prevLocalCartCopy = localCart; // store a copy of local cart

    setLocalCart((prevLocalCart) => {
      const updateItems = prevLocalCart.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total_price: item.product.price * newQuantity,
            }
          : item
      );

      return {
        ...prevLocalCart,
        items: updateItems,
        total_price: updateItems.reduce(
          (sum, item) => sum + item.total_price,
          0
        ),
      };
    });

    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.log(error);
      setLocalCart(prevLocalCartCopy); //Rollback to previous state if API fails
    }
  };

  const handleRemoveItem = async (itemId) => {
    setLocalCart((prevLocalCart) => {
      const updateItems = prevLocalCart.items.filter(
        (item) => item.id != itemId
      );

      return {
        ...prevLocalCart,
        items: updateItems,
        total_price: updateItems.reduce(
          (sum, item) => sum + item.total_price,
          0
        ),
      };
    });
    try {
      await deleteCartItems(itemId);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-teal-600 loading-xl"></span>
      </div>
    );

  if (!localCart)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">No cart Found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 animate-fade-in-up">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="flex items-center gap-1 hover:text-teal-600 transition">
            <FiHome className="w-4 h-4" />
            Home
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-teal-600 transition">
            Shop
          </Link>
          <FiChevronRight className="w-4 h-4" />
          <span className="text-teal-600 font-semibold flex items-center gap-1">
            <FiShoppingCart className="w-4 h-4" />
            Shopping Cart
          </span>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <FiShoppingCart className="w-8 h-8 text-teal-600" />
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            You have <span className="font-semibold">{localCart.items.length}</span> item{localCart.items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {localCart.items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <Link to="/shop" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg inline-block transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {/* Cart Items - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Suspense
                fallback={
                  <div className="flex justify-center items-center py-12">
                    <span className="loading loading-spinner text-teal-600 loading-lg"></span>
                  </div>
                }
              >
                <CartItemList
                  items={localCart.items}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleRemoveItem={handleRemoveItem}
                />
              </Suspense>
            </div>

            {/* Cart Summary - Sticky on desktop */}
            <div className="lg:sticky lg:top-20 lg:h-fit">
              <CartSummary
                totalPrice={localCart.total_price}
                itemCount={localCart.items.length}
                cartId={cartId}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
