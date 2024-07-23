import React, { useState } from 'react';
import data from '../../data/data'; 
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import './Slider.css';

export function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? data.length - 1 : currentSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === data.length - 1 ? 0 : currentSlide + 1
    );
  };

  return (
    <div className="slider-container">
      <div
        className="slider"
        style={{ transform: `translateX(-${100 * currentSlide}vw)` }}
      >
        {data.map(image => (
          <div
            key={image.id}
            className="slide"
            style={{ backgroundImage: `url(${image.src})` }}
          >
            <div className="slide-texts">
              <h1 className="slide-title">
                {image.title}
              </h1>
              <p className="slide-description">
                {image.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-buttons">
        <button
          onClick={prevSlide}
          className="slider-button prev-btn"
        >
          <ArrowLeft size={32} weight="bold" />
        </button>
        <button
          onClick={nextSlide}
          className="slider-button next-btn"
        >
          <ArrowRight size={32} weight="bold" />
        </button>
      </div>
    </div>
  );
}
