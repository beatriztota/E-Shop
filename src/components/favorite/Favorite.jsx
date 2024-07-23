import React from 'react';
import { useFavorite } from '../../context/FavoriteContext'; 
import { X } from 'phosphor-react';
import './Favorite.css';

export function Favorite() {
  const { favoriteItems, removeFavorite, isFavoriteOpen, closeFavorite } = useFavorite();
  const quantity = favoriteItems.length;

  return (
    <>
      {isFavoriteOpen && (
        <div className="favorite-dialog">
          <div className="dialog-content">
            <button className="dialog-close" aria-label="Close" onClick={closeFavorite}>
              <X size={24} weight="bold" />
            </button>

            <h2 className="dialog-title">
              <img className="dialog-icon" src="/favorite.svg" alt="Favoritos" /> Favoritos
            </h2>

            <section className="dialog-body">
              {quantity <= 0 ? (
                <div className="empty-message">
                  <img className="empty-image" src="/buy2.svg" alt="Favoritos vazios" />
                  <p className="empty-text">Favoritos está vazia 😞</p>
                </div>
              ) : (
                favoriteItems.map(favorite => (
                  <div key={favorite.id} className="favorite-item">
                    <img
                      className="favorite-image"
                      src={favorite.images[0]} 
                      alt={favorite.name}
                    />
                    <div className="favorite-details">
                      <p className="favorite-name">{favorite.name}</p>
                      <button
                        onClick={() => removeFavorite(favorite.id)}
                        className="remove-button"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
}
