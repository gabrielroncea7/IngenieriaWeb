import WordSchema from '../Schema/WordSchema';
import mongoose from 'mongoose';
import { Word } from '../../domain/word/Word';
import dotenv from 'dotenv';

dotenv.config(); //para poder usar la variable de entorno de la MONGODB_URI


class WordDAO{ //PATRON SINGLETON PARA EVITAR PROBLEMAS CON CONEXION

    private static instance: WordDAO;

    private constructor(){


    }

    public static getInstance(): WordDAO{ //PATRON SINGLETON

        if(!WordDAO.instance){

            WordDAO.instance = new WordDAO();

            this.instance.ConnectDB();

        }

        return WordDAO.instance;

    }

    public async getWords(){ //DEVUELVE UN JSON CON TODAS LAS PALABRAS DE LA COLECCION WORD

        const word = await WordSchema.find();

        return word;
    
    }

    public async addWord(palabra: string){ //OK

        const word = new WordSchema();

        word._word = palabra; //asigno de manera manual el valor a la plantilla mismo caso que en setUser
    
        try{
    
            await word.save();
    
            console.log('La palabra se ha introducido correctamente');

            return true;
    
        }catch(error){
    
            console.log(error);
    
            console.log('Ha ocurrido un error al insertar la palabra');

            return false;
    
        }
    
    }

    public async find(){ //METODO QUE DEVUELVE LA ULTIMA PALABRA INTRODUCIDA EN LA BD

        const wordSchema = new WordSchema();

        const lastWord = await WordSchema.findOne().sort({ createdAt: -1 });

        if(!lastWord){

            console.log("Error al conseguir la lista de palabras");

            return null;

        }
        else{

            const resultWord = new Word(lastWord._word || "", lastWord.createdAt);

            return resultWord;

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