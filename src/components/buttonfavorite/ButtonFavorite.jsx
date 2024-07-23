import React from 'react';
import { useFavorite } from '../../context/FavoriteContext'; 
import { Heart } from 'phosphor-react';
import './ButtonFavorite.css';

export function ButtonFavorite() {
  const { favoriteItems, openFavorite } = useFavorite(); 
  const quantity = favoriteItems.length;

  return (
    <button className="button-relative" onClick={openFavorite}>
      {quantity > 0 && (
        <span className="quantity-badge">
          {quantity}
        </span>
      )}
      <Heart
        size={35}
        weight="bold"
        className="heart-icon"
      />
    </button>
  );
}
