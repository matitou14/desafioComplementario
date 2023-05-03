import axios from "axios";

const API_URL = "/carts/";

const getCartById = async (cartId) => {
  try {
    const response = await axios.get(API_URL + cartId);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const addProductToCart = async (cartId, productId) => {
  try {
    const response = await axios.post(API_URL + cartId + "/products/" + productId);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const deleteProductFromCart = async (cartId, productId) => {
  try {
    const response = await axios.delete(API_URL + cartId + "/products/" + productId);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const updateCart = async (cartId, cartData) => {
  try {
    const response = await axios.put(API_URL + cartId, cartData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const updateProductQuantity = async (cartId, productId, quantity) => {
  try {
    const response = await axios.put(API_URL + cartId + "/products/" + productId, { quantity });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const deleteAllProductsFromCart = async (cartId) => {
  try {
    const response = await axios.delete(API_URL + cartId);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export default {
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  updateCart,
  updateProductQuantity,
  deleteAllProductsFromCart,
};
