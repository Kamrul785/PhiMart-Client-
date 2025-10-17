import { createContext } from "react";
import useCart from "../hook/useCart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const allvalue = useCart();
  return (
    <CartContext.Provider value={allvalue}>{children}</CartContext.Provider>
  );
};

export default CartContext;
