import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProducts } from '../../lib/stripe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useFavorite } from '../../context/FavoriteContext'; 
import { useCart } from '../../context/CartContext';  

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getAllProducts();
        const selectedProduct = data.find(product => product.id === productId);
        setProduct(selectedProduct);
      } catch (error) {
        console.error('Erro fetching', error);
        setError(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      console.log('Produto adicionado ao carrinho', product);
    }
  };

  const handleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
    console.log('Produto favoritado:', product);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: '5rem'
  };

  const contentStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
    gap: '40px'
  };

  const imageStyle = {
    width: '600px',
    height: 'auto',
    borderRadius: '8px',
  };

  const textStyle = {
    flex: 1,
    maxWidth: '100%'
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold'
  };

  const priceStyle = {
    color: 'rgb(0 135 95)',
    fontSize: '24px',
    margin: '10px 0'
  };

  const descriptionStyle = {
    color: '#ddd',
    fontSize: '18px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '20px',
    marginTop: '13rem'
  };

  const buttonStyle = {
    backgroundColor: 'rgb(0 135 95)',
    color: '#fff',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    width: '400px',
    height: '70px'
  };

  const favoriteButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgb(239, 68, 68)',
    width: '80px'
  };

  return (
    <div style={containerStyle}>
      {error ? (
        <p>{error}</p>
      ) : !product ? (
        <p>Carregando...</p>
      ) : (
        <div style={contentStyle}>
          <div style={{ maxWidth: '50%' }}>
            <img
              src={product.images[0]}
              alt={product.name}
              style={imageStyle}
            />
          </div>
          <div style={textStyle}>
            <h1 style={titleStyle}>{product.name}</h1>
            <p style={priceStyle}>R$ {(product.price / 100).toFixed(2)}</p>
            <p style={descriptionStyle}>{product.description}</p>
            <div style={buttonContainerStyle}>
              <button style={buttonStyle} onClick={handleAddToCart}>
                Adicionar ao Carrinho
              </button>
              <button style={favoriteButtonStyle} onClick={handleFavorite}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
