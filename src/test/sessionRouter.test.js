import { expect as _expect } from 'chai';
const expect = _expect;
import request from 'supertest';
import app from '../app.js';

describe('Session Router', () => {
  it('Debería iniciar sesión correctamente', async () => {
    const credentials = {
      email: 'mat.mengle@gmail.com',
      password: '$2b$10$lSyXBQbT2WAUZyVxhCHd1OZs7C.OXbeCTeEvfhkSOSAjl9fsgJHY6',
    };

    const res = await request(app)
      .post('/sessions/login')
      .send(credentials);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
   
  });

  it('Debería manejar credenciales incorrectas al iniciar sesión', async () => {
    const credentials = {
      email: 'mat.mengle@gmail.com',
      password: 'contraseñaIncorrecta',
    };

    const res = await request(app)
      .post('/sessions/login')
      .send(credentials);

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error', 'Credenciales incorrectas');
  });

  it('Debería manejar datos faltantes al iniciar sesión', async () => {
    const credentials = {
      email: 'mat.mengle@gmail.com',
      // Falta proporcionar la contraseña
    };

    const res = await request(app)
      .post('/sessions/login')
      .send(credentials);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Datos faltantes');
  });

  // Prueba para cerrar sesión correctamente
  it('Debería cerrar sesión correctamente', async () => {
    const res = await request(app)
      .post('/sessions/logout')
      .send();

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Sesión cerrada correctamente');
  });
});

