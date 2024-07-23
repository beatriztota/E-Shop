import React from 'react';
import './Photos.css';

export function Photos() {
  return (
    <div className="photos-container">
      <div className="photos-wrapper">
        <div className="photos-row">
          <div className="photo-item large">
            <img
              className="photo-image"
              src="/tv.jpg"
              alt="all"
            />
          </div>
          <div className="photo-item medium">
            <img
              className="photo-image"
              src="/videogame.jpg"
              alt="kids"
            />
          </div>
        </div>
        <div className="photos-row">
          <div className="photo-item small">
            <img
              className="photo-image"
              src="/celular.jpg"
              alt="men"
            />
          </div>
          <div className="photo-item small">
            <img
              className="photo-image"
              src="/fone.jpg"
              alt="women"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
