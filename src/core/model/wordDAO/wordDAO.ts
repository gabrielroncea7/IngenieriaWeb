import WordSchema from '../Schema/WordSchema';
import mongoose from 'mongoose';

class WordDAO{ //CUANDO SE DISPONGA DE LA CLASE WORD SE MODIFICARA PARA QUE LOS GET DEVUELVAN EL OBJETO

    constructor(){

    }

    public async getWord(){

        this.ConnectDB();

        const word = await WordSchema.find();

        console.log(word);

        this.DisconnectDB();
    
    }

    public async setWord(palabra: string){

        this.ConnectDB();

        const word = new WordSchema();

        word._word = palabra; //asigno de manera manual el valor a la plantilla mismo caso que en setUser
    
        try{
    
            await word.save();
    
            console.log('La palabra se ha introducido correctamente');

            this.DisconnectDB();

            return true;
    
        }catch(error){
    
            console.log(error);
    
            console.log('Ha ocurrido un error al insertar la palabra');

            this.DisconnectDB();

            return false;
    
        }
    
    }

    public async getWordbyid(id: string){

        this.ConnectDB();

        const foundword = await WordSchema.findById(id);
    
        if(foundword){

            console.log(foundword);

            this.DisconnectDB();
    
        }
        else{
    
            console.log('No se ha encontrado la palabra en la BD');

            this.DisconnectDB();
    
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

export default WordDAO;