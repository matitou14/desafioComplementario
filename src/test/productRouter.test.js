import { expect } from 'chai';
import supertest from 'supertest';

const request = supertest('http://localhost:8080');

describe('Product Router', () => {
  // Prueba para obtener todos los productos
  it('Debería obtener todos los productos', async () => {
    const res = await request
      .get('/products')
      .send();

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  // Prueba para crear un nuevo producto
  it('Debería crear un nuevo producto', async () => {
    const newProduct = {
      title: 'Nuevo Producto',
      description: 'Este es nuevo',
      code: 'Code000',
      price: 1500,
      status: true,
      stock: 10000,
      category: 'Asado',
      thumbnails: ['url1', 'url2']
    };

    const res = await request
      .post('/products')
      .send(newProduct);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
  });

  // Prueba para obtener un producto específico
  it('Debería obtener un producto específico', async () => {
    const productId = '64191b530f4522250f808175';

    const res = await request
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

    const res = await request
      .put(`/products/${productId}`)
      .send(updatedProduct);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id');
  });
});
