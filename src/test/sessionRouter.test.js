import { expect } from 'chai';
import supertest from 'supertest';


const request = supertest('http://localhost:8080');

describe('Session Router', () => {
  // Prueba para iniciar sesión correctamente
  it('Debería iniciar sesión correctamente', async () => {
    const credentials = {
      email: 'mat.mengle@gmail.com',
      password: '$2b$10$lSyXBQbT2WAUZyVxhCHd1OZs7C.OXbeCTeEvfhkSOSAjl9fsgJHY6',
    };

    const res = await request
      .post('/sessions/login')
      .send(credentials);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });

  // Prueba para manejar credenciales incorrectas al iniciar sesión
  it('Debería manejar credenciales incorrectas al iniciar sesión', async () => {
    const credentials = {
      email: 'mat.mengle@gmail.com',
      password: 'contraseñaIncorrecta',
    };

    const res = await request
      .post('/sessions/login')
      .send(credentials);

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error', 'Credenciales incorrectas');
  });

  // Prueba para manejar datos faltantes al iniciar sesión
  it('Debería manejar datos faltantes al iniciar sesión', async () => {
    const credentials = {
      email: 'mat.mengle@gmail.com',
      // Falta proporcionar la contraseña
    };

    const res = await request
      .post('/sessions/login')
      .send(credentials);

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error', 'Datos faltantes');
  });

  // Prueba para cerrar sesión correctamente
  it('Debería cerrar sesión correctamente', async () => {
    const res = await request
      .post('/sessions/logout')
      .send();

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Sesión cerrada correctamente');
  });
});
