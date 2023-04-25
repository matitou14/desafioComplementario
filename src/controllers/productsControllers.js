import { getAllProducts, getProductById, getProductByPid, createProduct, updateProduct, deleteProduct   } from "../services/products.service.js";

export const getAllProductsController = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 4;
    
    const result = await getAllProducts(page, limit);
    const prevLink = result.hasPrevPage ? `/products?page=${result.prevPage}` : '';
    const nextLink = result.hasNextPage ? `/products?page=${result.nextPage}` : '';
    const user = req.user;
    const data = {
      products: result.products, 
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink,
      nextLink,
      user: req.user.user
    };
    res.render('products', data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export const getProductByPidController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await getProductByPid(pid);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export const createProductController = async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await createProduct(newProduct);
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export const updateProductController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const productData = req.body;
    const product = await updateProduct(pid, productData);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const pid = req.params.pid;
    const deletedProduct = await deleteProduct(pid);
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }
    res.send(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};
