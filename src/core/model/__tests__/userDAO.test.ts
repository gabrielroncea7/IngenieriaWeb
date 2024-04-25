import UserDAO from '../userDAO/userDAO';
import UserSchema from '../Schema/UserSchema';
import mongoose from 'mongoose';
import {User} from '../../domain/user/User'

describe('UserDAO', () => {
  let userDAO: UserDAO;

  beforeEach(() => {
    userDAO = new UserDAO();
  });

  it('Probar funcion getUserbyname'  , async() =>{
    const user  = await userDAO.getUserbyname('Plantilla');
    expect(user).toEqual([]);
  }
  )

});