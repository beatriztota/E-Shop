import React, { createContext, useState, useContext } from 'react';

const FavoriteContext = createContext();

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);

  const openFavorite = () => setIsFavoriteOpen(true);
  const closeFavorite = () => setIsFavoriteOpen(false);

  const addFavorite = (product) => {
    setFavoriteItems((prevFavorites) => {
      if (prevFavorites.some((item) => item.id === product.id)) {
        return prevFavorites; 
      }
      console.log('Adding to favorites:', product); 
      return [...prevFavorites, product];
    });
  };
  

  const removeFavorite = (productId) => {
    setFavoriteItems((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== productId)
    );
  };

  const isFavorite = (productId) =>
    favoriteItems.some((item) => item.id === productId);

  return (
    <FavoriteContext.Provider
      value={{
        favoriteItems,
        addFavorite,
        removeFavorite,
        isFavorite,
        isFavoriteOpen,
        openFavorite,
        closeFavorite
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
