export async function getProductById(productId) {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Falha ao fetching o produto');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro fetching', error);
      return null;
    }
  }
  