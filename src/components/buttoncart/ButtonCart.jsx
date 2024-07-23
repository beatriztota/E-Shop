import React from 'react';
import { useCart } from '../../context/CartContext';
import { Handbag } from 'phosphor-react';
import './ButtonCart.css';

export function ButtonCart() {
  const { cartItems } = useCart();
  const quantity = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <a href="/cart" className="button-container">
      {quantity > 0 && (
        <span className="quantity-badge">
          {quantity}
        </span>
      )}
      <Handbag
        size={35}
        weight="bold"
        className="handbag-icon"
      />
    </a>
  );
}
