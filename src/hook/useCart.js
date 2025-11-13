import React, { useCallback, useEffect, useState } from "react";
// import apiClient from "../services/api-client";
import authApliClient from "../services/auth-api-client";

const useCart = () => {
  const [authToken] = useState(
    () => JSON.parse(localStorage.getItem("authTokens"))?.access
  );
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  // Create New Cart
  const createOrGetCart = useCallback(async () => {
    setLoading(true);
    try {
      console.log(authToken);
      const response = await authApliClient.post("/carts/");
      if (!cartId) {
        localStorage.setItem("cartId", response.data.id);
        setCartId(response.data.id);
      }
      setCart(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [authToken, cartId]);

  // Refresh Cart
  const refreshCart = useCallback(async () => {
    if (!cartId) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const response = await authApliClient.get(`/carts/${cartId}/`);
      setCart(response.data);
    } catch (error) {
      console.log("Error refreshing cart", error);
      // If cart no longer exists (404), clear local storage and state
      if (error.response?.status === 404) {
        localStorage.removeItem("cartId");
        setCartId(null);
        setCart(null);
      }
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  // Add Item to the Cart
  const AddCartItems = useCallback(
    async (product_id, quantity) => {
      setLoading(true);
      if (!cartId) await createOrGetCart();
      try {
        const response = await authApliClient.post(`/carts/${cartId}/items/`, {
          product_id,
          quantity,
        });
        await refreshCart();
        return response.data;
      } catch (error) {
        console.log("Error Occurs to Adding Items", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId, createOrGetCart, refreshCart]
  );

  // Update Item Quantity
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      try {
        await authApliClient.patch(`/carts/${cartId}/items/${itemId}/`, {
          quantity,
        });
      } catch (error) {
        console.log("Error updating cart Items", error);
      }
    },
    [cartId]
  );

  // Delete Cart Items
  const deleteCartItems = useCallback(
    async (itemId) => {
      try {
        await authApliClient.delete(`carts/${cartId}/items/${itemId}/`);
        await refreshCart();
      } catch (error) {
        console.log(error);
      }
    },
    [cartId, refreshCart]
  );

  useEffect(() => {
    const initializeCart = async () => {
      if(!authToken) return; 
      setLoading(true);
      await createOrGetCart();
      setLoading(false);
    };
    initializeCart();
  }, [authToken,createOrGetCart]);

  return {
    cart,
    loading,
    cartId,
    createOrGetCart,
    AddCartItems,
    updateCartItemQuantity,
    deleteCartItems,
    refreshCart,
  };
};

export default useCart;
