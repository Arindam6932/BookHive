import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

const LOCAL_STORAGE_KEY = 'bookhive-favorites';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing favorites from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book) => {
    setFavorites((prev) => [...prev, book]);
  };

  const removeFavorite = (bookId) => {
    setFavorites((prev) => prev.filter((book) => book.id !== bookId));
  };
  
  const isFavorite = (bookId) => {
    return favorites.some((book) => book.id === bookId);
  };

  const toggleFavorite = (book) => {
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};