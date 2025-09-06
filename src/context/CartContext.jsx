import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Define a key for storing the cart data in localStorage
const LOCAL_STORAGE_KEY = 'bookhive-cart-items';

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage or with an empty array
  const [items, setItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Error parsing saved cart items:", error);
      return [];
    }
  });

  // useEffect to save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    // Check if item already exists to avoid duplicates
    setItems((prevItems) => {
      const isItemInCart = prevItems.find(cartItem => cartItem.isbn === item.isbn);
      if (isItemInCart) {
        return prevItems; // Item is already in the cart
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (isbn) => {
    setItems((prevItems) => prevItems.filter((item) => item.isbn !== isbn));
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = {
    items,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};