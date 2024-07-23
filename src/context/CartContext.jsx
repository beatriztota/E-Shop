import React, { createContext, useContext, useState, useEffect } from 'react';
import { produce } from 'immer';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  function addFavorite(product) {
    setFavoriteItems(state => [...state, product]);
  }

  function removeFavorite(productId) {
    setFavoriteItems(state => state.filter(product => product.id !== productId));
  }

  function checkFavorite(productId) {
    return favoriteItems.some(product => product.id === productId);
  }

  function addToCart(product) {
    setCartItems(prevCart => {
      const productExists = prevCart.some(item => item.id === product.id);
      const newCart = productExists
        ? prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];

      console.log('Novo estado do carrinho:', newCart); 
      return newCart;
    });
  }

  function removeFromCart(productId) {
    setCartItems(prevCart => prevCart.filter(item => item.id !== productId));
  }

  function checkItemExists(productId) {
    return cartItems.some(product => product.id === productId);
  }

  
  function increaseItemQuantity(product) {
    const checkItemExists = cartItems.findIndex(cartItem => cartItem.id === product.id);

    const updatedList = produce(cartItems, draft => {
      if (checkItemExists < 0) {
        draft.push(product);
      } else {
        draft[checkItemExists].quantity = (draft[checkItemExists].quantity || 1) + 1;
      }
    });

    setCartItems(updatedList);
  }

   function decreaseItemQuantity(product) {
    const updatedList = produce(cartItems, draft => {
      const checkItemExists = cartItems.findIndex(cartItem => cartItem.id === product.id);

      if (checkItemExists !== -1 && draft[checkItemExists].quantity > 1) {
        draft[checkItemExists].quantity = draft[checkItemExists].quantity - 1;
      }
    });

    setCartItems(updatedList);
  }


  
  const cartTotal = cartItems.reduce((total, product) => {
    return total + (product.price || 0) * (product.quantity || 1);
  }, 0);

  const totalQuantity = cartItems.reduce((total, product) => {
    return total + (product.quantity || 1);
  }, 0);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        checkItemExists,
        checkFavorite,
        addFavorite,
        removeFavorite,
        favoriteItems,
        cartTotal,
        totalQuantity,
        increaseItemQuantity,
        decreaseItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
