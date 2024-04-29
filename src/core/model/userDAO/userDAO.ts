import UserSchema from '../Schema/UserSchema';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../../domain/user/User';
import { Email } from '../../domain/email/Email';

dotenv.config(); //para que detecte el archivo .env y localice la URI de la BD para la conexion

class UserDAO {

    constructor(){



    }

    public async getUserbyname(name: string){ //OK

        this.ConnectDB(); //conectamos al la base de datos

        const userfound = await UserSchema.findOne({_username: name}); 

        if(!userfound){

            console.log('No se ha encontrado el usuario en la BD');

            this.DisconnectDB(); //desconectamos la base de datos

            return false;

        }
        else{

             //transformamos el userfound en un objeto de la clase User

            const email = new Email(userfound._email || "");
            const user = new User("", "", email, "", 0, 0, 0);

            user.setId(userfound._id.toString()); //id del usuario
            user.setUsername(userfound._username || ""); //se pone la segunda opción porque es tipo undefined 
            user.setEmail(email); //se pone solo una opcion porque arriba se esta creando o dejando vacia según el valor de userfound
            user.setPassword(userfound._password || "");
            user.setPoints(userfound._points || 0);
            user.setWins(userfound._wins || 0);
            user.setGamesPlayed(userfound._gamesPlayed || 0);

            this.DisconnectDB(); //desconectamos la base de datos

            return user;

        }

       

    }

    public async setUser(username: string, email: string, password: string, points: number, wins: number, gamesPlayed: number){ //OK

        this.ConnectDB(); //conectamos la base de datos

        const user = new UserSchema();

        user._username = username;
        user._email = email;
        user._password = password;
        user._points = points;
        user._wins = wins;
        user._gamesPlayed = gamesPlayed;

        try{

            await user.save();

            this.DisconnectDB(); //desconectamos la base de datos

            return true;

        }catch(error){

            this.DisconnectDB(); //desconectamos la base de datos

            console.log(error);

            return false;

        }

    }

    public async deleteUser(id: string){ //OK

        this.ConnectDB(); //conectamos la base de datos

        const usertodelete = await UserSchema.findById(id);

        if(usertodelete){

            await UserSchema.findByIdAndDelete(usertodelete._id);

            this.DisconnectDB(); //desconectamos la base de datos

            return true;

        }
        else{

            console.log('No se ha encontrado el usuario');

            this.DisconnectDB(); //desconectamos la base de datos

            return false;

        }

    }

    public async updateUser(updatedUser: User){ //es como un set user pero con id incluido ya que se debe usar para actualizar los ya existentes ////OK

        //conectamos la base de datos

        this.ConnectDB();

        //hacemos delete del usuario

        this.deleteUser(updatedUser.getId()); //aqui podemos utilizar el string id del usuario recibido
        
        //introducimos el usuario con los datos nuevos

        const result = this.setUser(updatedUser.getUsername(), updatedUser.getEmail().get(), updatedUser.getPassword(), updatedUser.getPoints(), updatedUser.getWins(), updatedUser.getGamesPlayed());

        return result;

    }

    private async ConnectDB(){ //OK

        try{
    
            await mongoose.connect(process.env.MONGODB_URI || ""); //process.env.MONGODB_URI es una variable de entorno que se encuentra en src/core/.env, se pone el || "" pork podria ser undefined (NUNCA lo sera en este caso)
    
            return true;
    
        }catch(error){
    
            console.log(error);

            return false;
    
        }
    }

    private async DisconnectDB(){ //OK

        try{

            await mongoose.disconnect();

            return true;

        }catch(error){

            return false;

        }

    }

}

export default UserDAO;