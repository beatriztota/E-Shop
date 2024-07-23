import React from 'react';
import './Card.css';
import { Article, CreditCard, Lock, Truck } from "phosphor-react";

export function Card() {
  return (
    <div className="card-container">
      <div className="card-item">
        <div className="icon-container">
          <CreditCard className="icon" size={48} />
        </div>
        <div className="text-container">
          <h1 className="title">Parcelamento</h1>
          <span className="description">Em até 12x nos Cartões</span>
        </div>
      </div>
      <div className="card-item">
        <div className="icon-container">
          <Article className="icon" size={48} />
        </div>
        <div className="text-container">
          <h1 className="title">Boleto e Pix</h1>
          <span className="description">com 10% de Desconto</span>
        </div>
      </div>
      <div className="card-item">
        <div className="icon-container">
          <Truck className="icon" size={48} />
        </div>
        <div className="text-container">
          <h1 className="title">Entrega garantida</h1>
          <span className="description">em todo o Brasil.</span>
        </div>
      </div>
      <div className="card-item">
        <div className="icon-container">
          <Lock className="icon" size={48} />
        </div>
        <div className="text-container">
          <h1 className="title">Compra Segura</h1>
          <span className="description">Seus dados protegidos</span>
        </div>
      </div>
    </div>
  );
}
