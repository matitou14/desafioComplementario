// Definir la función para generar y entregar los productos
export const generateProducts = () => {
    const products = [];
  
    // Generar 100 productos con formato de petición de Mongo
    for (let i = 0; i < 100; i++) {
      const product = {
        name: `Product ${i}`,
        description: `Description ${i}`,
        price: i * 10,
        category: `Category ${i % 5}`,
        quantity: 100 - i,
      };
      products.push(product);
    }
  
    return products;
  };
  