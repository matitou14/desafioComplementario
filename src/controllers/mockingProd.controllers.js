
import { mockingService } from '../services/mockingProd.service.js';
import {error} from '../mocks/errors/error.js'
 
export const getMockingProducts = async (req, res, next) => {
    try {
      const products = await mockingService.getMockingProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    // Validar los campos name y price
    if (!name || !price) {
      throw new Error(error.invalidProductName);
    }
    // Verificar si el producto ya existe
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      throw new Error(error.productAlreadyExists);
    }
    // Crear el producto
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
