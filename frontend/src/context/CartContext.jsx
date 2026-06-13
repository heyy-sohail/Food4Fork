import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || "/api";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user]);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/cart`);
      setCart(data);
    } catch {
      setCart([]);
    }
  };

  const addToCart = async (foodId, name) => {
    if (!user) {
      toast.error("Please login to add items");
      return;
    }
    try {
      const { data } = await axios.post(`${API_URL}/cart/add`, { foodId, quantity: 1 });
      setCart(data);
      toast.success(`${name} added to cart! 🛒`);
    } catch (err) {
      toast.error("Failed to add item");
    }
  };

  const updateQuantity = async (foodId, quantity) => {
    try {
      const { data } = await axios.put(`${API_URL}/cart/update`, { foodId, quantity });
      setCart(data);
    } catch {
      toast.error("Failed to update cart");
    }
  };

  const removeItem = async (foodId) => {
    try {
      const { data } = await axios.delete(`${API_URL}/cart/remove/${foodId}`);
      setCart(data);
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/cart/clear`);
      setCart([]);
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.food?.price || 0) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart, cartTotal, cartCount, cartOpen,
      setCartOpen, addToCart, updateQuantity, removeItem, clearCart, fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
