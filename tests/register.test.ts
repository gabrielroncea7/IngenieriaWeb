import request from 'supertest';
import   'jest'
const app = require ('../src/core/api/registerAPI');

describe('Register Integration Tests', () => {
  it('debe responder con 200 OK y un mensaje de éxito si se proporcionan todos los campos', async () => {
    const userData = {
      username: 'example_user',
      email: 'example@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/register')
      .send(userData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Usuario registrado exitosamente');
  });

  it('debe responder con 400 Bad Request si falta algún campo', async () => {
    const userData = {
      username: 'example_user',
      // Missing email field
      password: 'password123'
    };

    const response = await request(app)
      .post('/register')
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Se requieren todos los campos: nombre de usuario, correo electrónico y contraseña');
  });
});
