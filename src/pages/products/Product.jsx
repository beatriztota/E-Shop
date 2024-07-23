import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { getAllProducts } from '../../lib/stripe';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(1); 


  const headingRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      }
    };

    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setExchangeRate(response.data.rates.BRL); 
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchProducts();
    fetchExchangeRate();
  }, []);

  useEffect(() => {
    if (headingRef.current && spanRef.current) {
      headingRef.current.style.color = 'white';
      headingRef.current.style.textAlign = 'center';
      headingRef.current.style.marginTop = '5rem';
      headingRef.current.style.fontSize = '3rem';
      headingRef.current.style.fontWeight = 'bold';

      spanRef.current.style.color = '#8a2be2'; 
    }
  }, []);

  const productListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '20px',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: '1200px', 
  };

  const productStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', 
    maxWidth: '400px', 
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#fff',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const imageContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '400px', 
    overflow: 'hidden',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', 
  };

  const titleOverlayStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    padding: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    color: '#fff',
    textAlign: 'center',
  };

  const productNameStyle = {
    margin: '0',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const productPriceStyle = {
    margin: '0',
    fontSize: '1.2rem',
    color: 'rgb(0 135 95)', 
  };

  const productHoverStyle = {
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <div>
      <h1 ref={headingRef}>
        Nossos <span ref={spanRef}>Destaques</span>
      </h1>
      <div style={productListStyle}>
        {error ? (
          <p className="error">Erro: {error}</p>
        ) : products.length > 0 ? (
          products.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ ...productStyle, ...productHoverStyle }}>
                <div style={imageContainerStyle}>
                  <img style={imageStyle} src={product.images[0]} alt={product.name} />
                  <div style={titleOverlayStyle}>
                    <h2 style={productNameStyle}>{product.name}</h2>
                    <p style={productPriceStyle}>
                      R${product.price ? ((product.price / 100) * exchangeRate).toFixed(2) : "Preço não disponível"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className='error-text'>Nenhum produto disponível</p>
        )}
      </div>
    </div>
  );
};

export default Product;
