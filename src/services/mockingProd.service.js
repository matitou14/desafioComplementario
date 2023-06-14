import { generateProducts } from '../mocks/mocking.js';

export const mockingService = {
    getMockingProducts: async () => {
      try {
        const products = generateProducts();
        return products;
      } catch (error) {
        console.error(error);
        throw new Error('Error generating mocking products');
      }
    },
  };

  