import React from 'react';
import { Link } from 'react-router-dom'; 
import { ButtonFavorite } from '../buttonfavorite/ButtonFavorite';
import './Header.css'; 
import { ButtonCart } from '../buttoncart/ButtonCart';
import { Favorite } from '../favorite/Favorite';

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-container">
        <img width={50} height={50} src='/logo.svg' alt="Logo" className="logo-img" />
        <h2 className="logo-text">
          <span className="logo-highlight">E-</span>Shop
        </h2>
      </Link>

      <div className="flex-gap">
        <ButtonFavorite/>
        <ButtonCart/>
      </div>
    </header>
  );
}

export default Header;
