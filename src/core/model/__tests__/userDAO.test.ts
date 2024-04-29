import UserDAO from '../userDAO/userDAO';
import UserSchema from '../Schema/UserSchema';
import mongoose from 'mongoose';
import {User} from '../../domain/user/User'
import {Email} from '../../domain/email/Email'
describe('Pruebas para la clase UserDAO', () => {
  let userDAO1: UserDAO;
  let userDAO2: UserDAO;
  let userDAO3: User;
  let email: Email;
  beforeEach(() => {
    // Crear nuevas instancias de UserDAO antes de cada prueba
    userDAO1 = new UserDAO();
    userDAO2 = new UserDAO();
    email = new Email ('plantilla@gmail.com');
    userDAO3 = new User('661525962ba905c4cb8c05cf','Plantilla',email,'plantillapassword',1,0,0);
  });
  

    it('Probar funcion getUserbyname'  , async() =>{
      const expectedUser = {
        "_email": {"_email": "plantilla@gmail.com"},
        "_gamesPlayed": 0,
        "_id": "661525962ba905c4cb8c05cf",
        "_password": "plantillapassword",
        "_points": 0,
        "_username": "Plantilla",
        "_wins": 0
      };
      const user  = await userDAO1.getUserbyname('Plantilla');
      expect(user).toEqual(expectedUser);
    }
    )

   it('Probar funcion setUser de un usuario que ya está en la base de datos'  , async() =>{
    
      const user = await userDAO2.setUser('Prueba','prueba@gmail.com','12345',3,2,6);
      expect(user).toEqual(true);
    }
    )

    it('Probar funcion deleteUser de un usuario que está en la base de datos'  , async() =>{
    
      const user = await userDAO2.deleteUser('661525962ba905c4cb8c05cf');
      expect(user).toEqual(true);
    }
    )
    //Probamos a hacer la misma llamada para ver si se ha borrado correctamente
    it('Probar funcion deleteUser de un usuario que no está en la base de datos'  , async() =>{
    
      const user = await userDAO2.deleteUser('661525962ba905c4cb8c05cf');
      expect(user).toEqual(false);
    }
    )
    //Probamos la función updateUser
    it('Probar funcion updateUser de un usuario'  , async() =>{
    
      const user = await userDAO2.updateUser(userDAO3);
      expect(user).toEqual(true);
    }
    )

});

