import React, { Suspense, useEffect, useState } from "react";
import useCartContext from "../hook/useCartContext";
import CartItemList from "../components/Cart/CartItemList.jsx";
import CartSummary from "../components/Cart/CartSummary.jsx";

const Cart = () => {
  const {
    cart,
    cartId,
    loading,
    createOrGetCart,
    updateCartItemQuantity,
    deleteCartItems,
    refreshCart,
  } = useCartContext();

  const [localCart, setLocalCart] = useState(cart);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!cart && !loading) createOrGetCart();
  }, [createOrGetCart, cart, loading]);

  // useEffect(() => {
  //   refreshCart();
  // }, [refreshCart]);

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
      setError(null);
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
      await refreshCart();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <span className="loading loading-spinner text-secondary loading-xl "></span>
      </div>
    );
  if (!localCart)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-gray-600">No cart found</p>
        </div>
      </div>
    );
  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner text-secondary loading-xl"></span>
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
        <div>
          <CartSummary
            totalPrice={localCart.total_price}
            itemCount={localCart.items.length}
            cartId={cartId}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
