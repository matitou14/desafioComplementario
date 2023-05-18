import { mockingService } from '../services/mockingProd.service.js';
import { error } from '../mocks/errors/error.js';
import Product from '../dao/models/prod.mock.models.js';


export const getMockingProducts = async (req, res, next) => {
  try {
    const products = await mockingService.getMockingProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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
    const newProduct = new Product({ name, price });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

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
