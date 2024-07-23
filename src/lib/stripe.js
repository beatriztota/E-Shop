import { Product } from './models';

const stripeBaseURL = 'https://api.stripe.com/v1/products';
const stripePricesURL = 'https://api.stripe.com/v1/prices';

export async function getAllProducts() {
  try {
    console.log('Fetching all products from Stripe');
    const response = await fetch(stripeBaseURL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Failed to fetch products:', response.status, errorDetails);
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    const products = data.data;

    const productsWithPrices = await Promise.all(products.map(async (product) => {
      const prices = await getProductPrices(product.id);
      return new Product(
        product.id,
        product.name,
        product.images, 
        product.description,
        prices.length > 0 ? prices[0].unitAmount / 100 : null 
      );
    }));

    const uniqueProducts = Array.from(new Set(productsWithPrices.map(product => product.id)))
      .map(id => productsWithPrices.find(product => product.id === id));

    console.log('Products fetched with prices:', uniqueProducts);
    return uniqueProducts;
  } catch (error) {
    console.error('Error fetching produtos:', error.message);
    throw error;
  }
}


export async function getProductPrices(productId) {
  try {
    console.log('Fetching preços pelo ID:', productId);
    const response = await fetch(`${stripePricesURL}?product=${productId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Falha ao fetch preços:', response.status, errorDetails);
      throw new Error(`Falha ao fetch preços: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Preços fetched:', data);
    return data.data.map(price => ({
      id: price.id,
      unitAmount: price.unit_amount
    }));
  } catch (error) {
    console.error('Error fetching prices:', error.message);
    throw error;
  }
}
