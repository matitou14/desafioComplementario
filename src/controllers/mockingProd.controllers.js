
import { mockingService } from '../services/mockingProd.service.js';

export const getMockingProducts = async (req, res, next) => {
    try {
      const products = await mockingService.getMockingProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
