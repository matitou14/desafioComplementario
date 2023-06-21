
import { expect as _expect } from 'chai';
import request from 'supertest';
import app from '../app.js';


const expect = _expect;

describe('Cart Router', () => {
  it('Debería obtener el carrito de un usuario', async () => {
    const userId = '642a60eb3b5135a626b0518f'; // AGREGAR UN USER ID VALIDO

    const res = await request(app)
      .get(`/carts/${userId}`)
      .send();

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
  });

  it('Debería agregar un producto al carrito de un usuario', async () => {
    const userId = '642a60eb3b5135a626b0518f'; 
    const productId = '640d6f35e544e447ef38887c'; 

    const res = await request(app)
      .post(`/carts/${userId}/products/${productId}`)
      .send();

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message');
  });

    it('Debería eliminar un producto del carrito de un usuario', async () => {
        const userId = '642a60eb3b5135a626b0518f'; 
        const productId = '640d6f35e544e447ef38887c'; 
    
    const res = await request(app)
      .delete(`/carts/${userId}/products/${productId}`)
      .send();

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message');

    const cartRes = await request(app)
      .get(`/carts/${userId}`)
      .send();

    expect(cartRes.status).to.equal(200);
   
    expect(cartRes.body.products).to.not.include(productId);
});

// Prueba para actualizar la cantidad de un producto en el carrito
it('Debería actualizar la cantidad de un producto en el carrito', async () => {
    const userId = '642a60eb3b5135a626b0518f'; 
    const productId = '64191b530f4522250f808175'; 

    const updatedProduct = {
      quantity: 5, // CAMBIAR LA CANTIDAD DESEADA
    };

    const res = await request(app)
      .put(`/carts/${userId}/products/${productId}`)
      .send(updatedProduct);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('quantity', updatedProduct.quantity);
  });

  // Prueba para eliminar todos los productos del carrito
  it('Debería eliminar todos los productos del carrito', async () => {
    const userId = '642a60eb3b5135a626b0518f'; 

    const res = await request(app)
      .delete(`/carts/${userId}/products`)
      .send();

    expect(res.status).to.equal(200);

    const cartRes = await request(app)
      .get(`/carts/${userId}`)
      .send();

    expect(cartRes.status).to.equal(200);
    expect(cartRes.body.products).to.be.an('array').that.is.empty;
  });


});

