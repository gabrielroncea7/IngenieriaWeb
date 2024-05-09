import UserDAO from '../userDAO/userDAO';
import { User } from '../../domain/user/User';
import { Email } from '../../domain/email/Email';
describe('Pruebas para la clase UserDAO', () => {
  const userDAO1 = UserDAO.getInstance();
  let user1 : User;
  let email : Email;
  


  it('Probar funcion addUser de un usuario que no esta( también se prueba delete)', async () => {
    let user = await userDAO1.addUser('Prueba3', 'prueba3@gmail.com', '12345', 4, 3, 7);
    if(user == false){
      await userDAO1.delete('Prueba3');
      user=await userDAO1.addUser('Prueba3', 'prueba3@gmail.com', '12345', 4, 3, 7);
      expect(user).toEqual(true);
    }
    expect(user).toEqual(true);


  });
  it('Probar función updateUser ', async () => {
    await userDAO1.addUser('PruebaUpdate', 'pruebaUpdate@gmail.com', '12345', 3, 1, 6);
    let user2 = await userDAO1.find('PruebaUpdate');
    let id = '';
    let email = new Email('');
  
    if (user2 !== null) {
      id = user2.getId();
      email = user2.getEmail();
      let userUpdate = new User(id, 'PruebaUpdate', email, '12345', 1, 3, 7);
  
      // Esperar a que updateUser se complete antes de continuar con la prueba
      await userDAO1.updateUser(userUpdate).then(result => {
        expect(result).toBe(true);
      });
  
      // Eliminar el usuario actualizado
      await userDAO1.delete('PruebaUpdate').then(result => {
        expect(result).toBe(true);
      });
    } else {
      console.log('Usuario no encontrado');
    }
  });
    it('Probar funcion find', async () => {
      const expectedUser = {
        "_email": { "_email": "plantilla@gmail.com" },
        "_gamesPlayed": 0,
        "_id": "6638f5471949e007de197ce8",
        "_password": "plantillapassword",
        "_points": 0,
        "_username": "Plantilla",
        "_wins": 0
      };
  
      const user = await userDAO1.find('Plantilla');
    expect(user).toEqual(expectedUser);
    
    




  });
  
  it('Probar funcion addUser de un usuario que ya esta', async () => {
    // Datos del usuario a agregar
    const username = 'Prueba';
    const email = 'prueba@gmail.com';
    const password = '12345';
    const points = 2;
    const wins = 3;
    const gamesPlayed = 4;

    // Intentar agregar el usuario
    const user = await userDAO1.addUser(username, email, password, points, wins, gamesPlayed);

    // Esperar que la operación de addUser falle
    expect(user).toEqual(false);
  },10000);
  
  

});
