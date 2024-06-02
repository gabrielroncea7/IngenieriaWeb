import UserSchema from '../Schema/UserSchema';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../../domain/user/User';
import { Email } from '../../domain/email/Email';

dotenv.config(); //para que detecte el archivo .env y localice la URI de la BD para la conexion

class UserDAO { //PATRON SINGLETON PARA EVITAR PROBLEMAS DE CONEXION

    private static instance: UserDAO;

    private constructor(){

        

    }

    public static getInstance(): UserDAO { //utilizamos el patron de diseño singleton para evitar problemas con la conexion/desconexion de los datos

        if(!UserDAO.instance){

            UserDAO.instance = new UserDAO(); //unica vez que se crea UserDAO

            this.instance.ConnectDB(); //conectamos la BD solo cuando el objeto se crea por primera vez, la conexion queda establecida

        }

        return UserDAO.instance; //devuelve UserDAO a donde se necesario su uso pero siempre la misma instancia

    }

    public async find(name: string){ //RECIBE NOMBRE DE USUARIO EN CADENA STRING Y RETORNA EL USUARIO EN TIPO USER

        const userfound = await UserSchema.findOne({_username: name});

        if(!userfound){ 

            console.log('No se ha encontrado el usuario en la BD');

            return null;

        }
        else{

             //transformamos el userfound en un objeto de la clase User

            const email = new Email(userfound._email || "");
            const user = new User("", "", email, "", 0, 0, 0);

            user.setId(userfound._id.toString()); //id del usuario
            user.setUsername(userfound._username || ""); //se pone la segunda opción porque es tipo undefined
            user.setPassword(userfound._password || "");
            user.setPoints(userfound._points || 0);
            user.setWins(userfound._wins || 0);
            user.setGamesPlayed(userfound._gamesPlayed || 0);

            return user;

        }

    }

    public async addUser(username: string, email: string, password: string, points: number, wins: number, gamesPlayed: number){ //REDCIBE LOS PARAMETROS DE UN USUARIO Y LO INSERTA EN LA BD RETORNA BOOLEANO

        //comprobamos que el usuario no exista anteriormente

        const useralreadyinBD = await UserSchema.findOne({_username: username});

        if(useralreadyinBD){ //si el usuario se ha encontrado no es necesario introducirlo en la BD

            console.log("El usuario ya se encuentra en la BD");

            return false;

        }

        //realizamos el proceso para introducir el usuario en la BD

        const user = new UserSchema();

        user._username = username;
        user._email = email;
        user._password = password;
        user._points = points;
        user._wins = wins;
        user._gamesPlayed = gamesPlayed;

        try{

            await user.save();

            return true;

        }catch(error){

            console.log(error);

            return false;

        }

    }

    public async delete(name: string){ //RECIBE EL NOMBRE EN CADENA STRING Y LO ELIMINA DE LA BASE DE DATOS RETORNA BOOLEANO

        const usertodelete = await UserSchema.findOne({_username: name});

        if(usertodelete){

            await UserSchema.findByIdAndDelete(usertodelete._id);

            return true;

        }
        else{

            console.log('No se ha encontrado el usuario');

            return false;

        }

    }

    public async updateUser(updatedUser: User){ //es como un set user pero con id incluido ya que se debe usar para actualizar los ya existentes ////OK

        //hacemos delete del usuario

        this.delete(updatedUser.getUsername()); //aqui podemos utilizar el string id del usuario recibido
        
        //introducimos el usuario con los datos nuevos

        const result = this.addUser(updatedUser.getUsername(), updatedUser.getEmail(), updatedUser.getPassword(), updatedUser.getPoints(), updatedUser.getWins(), updatedUser.getGamesPlayed());

        return result;

    }

    public async findByEmail(email: String){

        const userfound = await UserSchema.findOne({_email: email});

        if(!userfound){

            //no se ha encontrado ningun usuario que utilice ese mail

            return null;

        }
        else{

            //devolvemos el user

            const email = new Email(userfound._email || "");
            const user = new User("", "", email, "", 0, 0, 0);

            user.setId(userfound._id.toString()); //id del usuario
            user.setUsername(userfound._username || ""); //se pone la segunda opción porque es tipo undefined 
            user.setPassword(userfound._password || "");
            user.setPoints(userfound._points || 0);
            user.setWins(userfound._wins || 0);
            user.setGamesPlayed(userfound._gamesPlayed || 0);

            return user;

        }

    }

    private async ConnectDB(){ //OK

        try{
    
            await mongoose.connect(process.env.MONGODB_URI || ""); //process.env.MONGODB_URI es una variable de entorno que se encuentra en src/core/.env, se pone el || "" pork podria ser undefined (NUNCA lo sera en este caso)

            console.log("La base de datos se ha conectado");

            return true;
    
        }catch(error){
    
            console.log(error);

            return false;
    
        }
    }

    private async DisconnectDB(){ //OK

        try{

            await mongoose.disconnect();

            console.log("la BD se ha desconectado");

            return true;

        }catch(error){

            return false;

        }

    }

}

export default UserDAO;