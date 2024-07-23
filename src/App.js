import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoriteProvider } from './context/FavoriteContext';
import Home from './pages/home/Home';
import ProductDetails from './pages/productdetail/ProductDetail';
import Cart from './pages/cart/Cart';
import Header from './components/header/Header';
import { Favorite } from './components/favorite/Favorite';

const App = () => {
  return (
    <CartProvider>
      <FavoriteProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Favorite />
      </FavoriteProvider>
    </CartProvider>
  );
};

export default App;
