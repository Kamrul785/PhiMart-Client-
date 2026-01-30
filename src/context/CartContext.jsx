import { createContext, useEffect } from "react";
import useCart from "../hook/useCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const allvalue = useCart();

  // Listen for storage changes (when cart is cleared in another tab or after order)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cartId" && !e.newValue) {
        // Cart was cleared, refresh to sync state
        allvalue.refreshCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [allvalue]);
  return (
    <CartContext.Provider value={allvalue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
