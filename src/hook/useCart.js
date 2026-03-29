import { useCallback, useEffect, useState, useRef } from "react";
// import apiClient from "../services/api-client";
import authApliClient from "../services/auth-api-client";

const useCart = () => {
  const [authToken] = useState(
    () => JSON.parse(localStorage.getItem("authTokens"))?.access
  );
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);
  const cartIdRef = useRef(cartId);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Update ref when cartId changes
  useEffect(() => {
    cartIdRef.current = cartId;
  }, [cartId]);

  // Fetch Cart Data
  const fetchCart = useCallback(async (id) => {
    if (!id) return;
    try {
      console.log("Fetching cart:", id);
      const response = await authApliClient.get(`/carts/${id}/`);
      console.log("Cart fetched successfully:", response.data);
      setCart(response.data);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  }, []);

  // Create New Cart
  const createOrGetCart = useCallback(async () => {
    setLoading(true);
    try {
      console.log(authToken);
      const response = await authApliClient.post("/carts/");
      console.log("Cart created:", response.data.id);
      localStorage.setItem("cartId", response.data.id);
      setCartId(response.data.id);
      cartIdRef.current = response.data.id;
      setCart(response.data);
      return response.data.id;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

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
      try {
        let currentCartId = cartIdRef.current;
        
        // If no cart exists, create one first
        if (!currentCartId) {
          currentCartId = await createOrGetCart();
        }

        console.log("Adding to cart:", currentCartId, product_id, quantity);
        const response = await authApliClient.post(`/carts/${currentCartId}/items/`, {
          product_id,
          quantity,
        });
        
        console.log("Item added. Fetching updated cart...");
        // Refetch cart after adding item
        await new Promise(resolve => setTimeout(resolve, 200));
        await fetchCart(currentCartId);
        setRefreshTrigger(prev => prev + 1);
        return response.data;
      } catch (error) {
        console.log("Error Occurs to Adding Items", error);
      } finally {
        setLoading(false);
      }
    },
    [createOrGetCart, fetchCart]
  );

  // Update Item Quantity
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      try {
        const currentCartId = cartIdRef.current;
        if (!currentCartId) return;
        
        console.log("Updating quantity:", itemId, quantity);
        await authApliClient.patch(`/carts/${currentCartId}/items/${itemId}/`, {
          quantity,
        });
        
        console.log("Quantity updated. Fetching updated cart...");
        // Refetch cart after updating quantity
        await new Promise(resolve => setTimeout(resolve, 200));
        await fetchCart(currentCartId);
        setRefreshTrigger(prev => prev + 1);
      } catch (error) {
        console.log("Error updating cart Items", error);
      }
    },
    [fetchCart]
  );

  // Delete Cart Items
  const deleteCartItems = useCallback(
    async (itemId) => {
      try {
        const currentCartId = cartIdRef.current;
        if (!currentCartId) return;
        
        console.log("Deleting item:", itemId);
        await authApliClient.delete(`/carts/${currentCartId}/items/${itemId}/`);
        
        console.log("Item deleted. Fetching updated cart...");
        // Refetch cart after deleting item
        await new Promise(resolve => setTimeout(resolve, 200));
        await fetchCart(currentCartId);
        setRefreshTrigger(prev => prev + 1);
      } catch (error) {
        console.log(error);
      }
    },
    [fetchCart]
  );

  useEffect(() => {
    const initializeCart = async () => {
      if(!authToken) return; 
      setLoading(true);
      const storedCartId = localStorage.getItem("cartId");
      
      if (storedCartId) {
        // Cart already exists, just fetch it
        console.log("Cart exists, fetching...");
        cartIdRef.current = storedCartId;
        setCartId(storedCartId);
        try {
          const response = await authApliClient.get(`/carts/${storedCartId}/`);
          console.log("Cart fetched successfully:", response.data);
          setCart(response.data);
        } catch (error) {
          console.log("Error fetching cart:", error);
        }
      } else {
        // No cart exists, create a new one
        console.log("No cart, creating new one...");
        try {
          const response = await authApliClient.post("/carts/");
          console.log("Cart created:", response.data.id);
          localStorage.setItem("cartId", response.data.id);
          setCartId(response.data.id);
          cartIdRef.current = response.data.id;
          setCart(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      setLoading(false);
    };
    initializeCart();
  }, []);

  return {
    cart,
    loading,
    cartId,
    createOrGetCart,
    AddCartItems,
    updateCartItemQuantity,
    deleteCartItems,
    fetchCart,
    refreshTrigger,
  };
};

export default useCart;
