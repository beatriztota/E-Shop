import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import { Slider } from '../../components/slider/Slider';
import { Favorite } from '../../components/favorite/Favorite';
import { Card } from '../../components/card/Card';
import { getAllProducts } from '../../lib/stripe';
import Product from '../products/Product';
import { Photos } from '../../components/photos/Photos';
import { Footer } from '../../components/footer/Footer';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
        setError(error.message);
      }
    }

    fetchProducts();
  }, []); 

  return (
    <>
      <Favorite />
      <Slider />
      <Card />
      <Product products={products} error={error} /> 
      <Photos/>
      <Footer/>
    </>
  );
}

export default Home;
