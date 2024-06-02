// Import class user & email
import { User } from '../../domain/user/User';
import { Email } from '../../domain/email/Email';
import UserDAO from '../../model/userDAO/userDAO';
import * as bcrypt from 'bcrypt'
 
class AccountManager {
    constructor() {}

    // Method to sign in
    async signIn(username: string, password: string): Promise<boolean> {
        const userDao: UserDAO = UserDAO.getInstance()

        const user = await userDao.find(username)
        
        if(user !== null){
            return await bcrypt.compare(password, user.getPassword())
        }
        else{
            return false
        }
    }

    // Method to sign up
    async signUp(username: string, email: string, password: string): Promise<boolean> {
        const userDao: UserDAO = UserDAO.getInstance()

        let exists = await userDao.find(username)
        exists = exists && await userDao.findByEmail(email)

        if(exists){

            const passwordHash = await bcrypt.hash(password, 10)

            return await userDao.addUser(username, email, passwordHash, 0,0, 0)
        }
        else{
            return false
        }       
    }

    async getUser(username: string): Promise<User | null> {
        const userDao: UserDAO = UserDAO.getInstance()
        return await userDao.find(username)
    
    }

    // Metodo para borrar una cuenta de un usuario
    async deleteAccount(username: string, password: string): Promise<Boolean> {
        // Buscar al usuario por el nombre de usuario
        const userDao: UserDAO = UserDAO.getInstance()

        const user = await userDao.find(username)
        
        if(user !== null && (await bcrypt.compare(password, user.getPassword())) === true ){
             userDao.delete(username)
             return true;
        }
        else{
            return false
        }
        }
    }
        

export default AccountManager;
