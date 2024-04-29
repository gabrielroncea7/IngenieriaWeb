import request from 'supertest';
import   'jest'
const app = require ('../src/core/api/loginAPI');

describe('Login INtegration Tests', async () => {
  it('Debe responder con 200 OK y un mensaje de éxito si las credenciales son válidas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'example', password: 'password123' }); // Cambia los valores según corresponda

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful.');
    expect(response.body.user.username).toBe('example');
  });

  it('Debe responder con 400 Bad Request si falta el nombre de usuario o la contraseña', async () => {
    const response = await request(app)
      .post('/login')
      .send({}); // Envía un objeto vacío para simular que faltan credenciales

    expect(response.status).toBe(400);
  });

  it('debe responder con 401 No autorizado si las credenciales no son válidas', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'nonexistent', password: 'invalidpassword' }); // Credenciales inválidas

    expect(response.status).toBe(401);
  });
});
