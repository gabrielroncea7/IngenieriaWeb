import User from '../model/UserSchema';
import mongoose from 'mongoose';

class UserDAO { //CUANDO SE DISPONGA DE LA CLASE USER SE MODIFICARA PARA QUE LOS GET DEVUELVAN EL OBJETO

    constructor(){



    }


   public async getUser(){

        this.ConnectDB(); //conectamos la base de datos

        const Users = await User.find(); //Users contiene todos los datos encontrados en la BD que siguen el schema User

        this.DisconnectDB(); //desconectamos la base de datos

        console.log(Users);

    }

    public async getUserbyname(name: string){

        this.ConnectDB(); //conectamos al la base de datos

        const userfound = await User.findOne({_username: name}); 

        if(!userfound){

            console.log('No se ha encontrado el usuario en la BD');

            this.DisconnectDB(); //desconectamos la base de datos

        }

        console.log(userfound);

        this.DisconnectDB(); //desconectamos la base de datos

    }

    public async setUser(username: string, email: string, password: string, points: number, wins: number, gamesPlayed: number){ //NO ESTA DEFINITIVO NECESITO LA CLASE USER PARA DEJARLO TERMINADO

        this.ConnectDB(); //conectamos la base de datos

        const user = new User();

        user._username = username; //como no tengo el objeto de la clase USER asignare a la plantilla los valores manualmente
        user._email = email;
        user._password = password;
        user._points = points;
        user._wins = wins;
        user._gamesPlayed = gamesPlayed;

        //en el futuro se puede indicar directamente el objeto o si Mongoose no lo permite se hara la misma equivalencia anterior utilizando el objeto de la clase USER en vez de los valores uno a uno

        try{

            await user.save();

            this.DisconnectDB(); //desconectamos la base de datos

            console.log('El usuario ha sido guardado correctamente');

        }catch(error){

            this.DisconnectDB(); //desconectamos la base de datos

            console.log(error);

        }

    }

    public async deleteUser(id: string){

        this.ConnectDB(); //conectamos la base de datos

        const usertodelete = await User.findById(id);

        if(usertodelete){

            await User.findByIdAndDelete(usertodelete._id);

            console.log('El usuario se ha eliminado correctamente');

            this.DisconnectDB(); //desconectamos la base de datos

        }
        else{

            console.log('No se ha encontrado el usuario');

            this.DisconnectDB(); //desconectamos la base de datos

        }

    }

    private async ConnectDB(){

        try{
    
            await mongoose.connect(process.env.MONGODB_URI || ""); //process.env.MONGODB_URI es una variable de entorno que se encuentra en src/core/.env, se pone el || "" pork podria ser undefined (NUNCA lo sera en este caso)
    
            console.log('MongoDB database connected');
    
        }catch(error){
    
            console.log(error);
    
        }
    }

    private async DisconnectDB(){

        try{

            await mongoose.disconnect();

            console.log('MongoDB database disconnected properly');

        }catch(error){

            console.log('Error al cerrar al desconectar la Base de datos');

        }

    }

}

export default UserDAO;