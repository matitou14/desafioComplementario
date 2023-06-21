
import { expect as _expect } from 'chai';
const expect = _expect;
import request from 'supertest';
import app from '../app.js';

describe('Product Router', () => {
  it('Debería obtener todos los productos', async () => {
    const res = await request(app)
      .get('/products')
      .send();

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  // CREAR UN NUEVO PRODUCTO

  it('Debería crear un nuevo producto', async () => {
    const newProduct = {
        id:String,
        title: "Nuevo Producto", 
        description: "Este es nuevoW",
        code: "Code000", 
        price: 1500, 
        status: true,
        stock: 10000,
        category: "Asado", 
        thumbnails: [String],
    };

    const res = await request(app)
      .post('/products')
      .send(newProduct);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
  });

    // TRAER UN PRODUCTO ESPECIFICO
  it('Debería obtener un producto específico', async () => {
   
    const productId = '64191b530f4522250f808175';

    const res = await request(app)
      .get(`/products/${productId}`)
      .send();

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');

});

 // Prueba para actualizar un producto
 it('Debería actualizar un producto existente', async () => {

const productId = '64191b530f4522250f808175';
const updatedProduct = {
    title: 'Producto actualizado',
    price: 19.99,
    description: 'Descripción actualizada',
    code: 'P456',
    status: true,
    stock: 20,
    category: 'Nueva categoría',
    thumbnails: ['url3', 'url4']
  };

  const res = await request(app)
    .put(`/products/${productId}`)
    .send(updatedProduct);

  expect(res.status).to.equal(200);
  expect(res.body).to.have.property('_id');
});





});