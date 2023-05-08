import  CartRepository  from '../repositories/CartRepository.js';


 const cartRepository = new CartRepository();

export const createCart = async (userId) => {
  return cartRepository.createCart(userId);
};

export const getCartById = async (cartId) => {
  return cartRepository.getCartById(cartId);
};

export const addProductToCart = async (cartId, productId, quantity) => {
  return cartRepository.addProductToCart(cartId, productId, quantity);
};

export const updateProductQuantity = async (cartId, productId, quantity) => {
  return cartRepository.updateProductQuantity(cartId, productId, quantity);
};

export const deleteProductFromCart = async (cartId, productId) => {
  return cartRepository.deleteProductFromCart(cartId, productId);
};

export const deleteAllProductsFromCart = async (cartId) => {
  return cartRepository.deleteAllProductsFromCart(cartId);
};

export default CartRepository;
