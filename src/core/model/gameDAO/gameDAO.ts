import GameSchema from '../Schema/GameSchema'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { convertToObject } from 'typescript';

dotenv.config(); //PARA LA CONEXION CON LA BD

class GameDAO{ //utilizaremos el patron singleton

    private static instance: GameDAO

    private constructor(){



    }

    public static getInstance(){

        if(!GameDAO.instance){

            GameDAO.instance = new GameDAO();

            this.instance.ConnectDB(); //abrimos conexion con la BD

        }

        return GameDAO.instance; //devolvemos instancia de GameDAO

    }


    public async getLastGame(username: String){ //OK DEVUELVE EL LASTGAME EN FORMATO STRING PORQUE EN JSON NO PERMITE VER EL VALOR DE LOS ARRAYS ANIDADOS

        const foundgame = await GameSchema.findOne({_username: username}).sort({createdAt: -1})

        if(!foundgame){

            console.log("No se ha encontrado el game en la base de datos");

            return false;

        }
        else{

            const gameString = JSON.stringify(foundgame, null, 2); //ESTO PERMITE PODER VISUALIZAR EL CONTENIDO DE LOS ARRAYS ANIDADOS

            return gameString;

        }

    }

    public async addGame(username: string, attempt: string){ //OK --> el formato del string tiene que ser JSON

        //crear esquema con los datos obtenidos

        const gameSchema = new GameSchema;

        gameSchema._username = username;

        gameSchema._points = 0;

        const attemptsArray = JSON.parse(attempt); //convierte el string en un array

        gameSchema._attempts = attemptsArray; //copiamos el array al esquema

        //introducir esquema en la BD

        try{

            await gameSchema.save();

            return true;

        }catch(error){

            console.log(error);

            return false;

        }

    }

    public async addAttempt(username: String, attempt: string){

        //recuperar lastGame

        const foundgame = await GameSchema.findOne({_username: username}).sort({createdAt: -1})

        if(!foundgame){

            console.log("Game no encontrado");

            return false;

        }
        else{

            //actualizar lastGame

            const attemptsArray = foundgame._attempts; //vector con los intentos

            const nuevointento:{value: string, color: string}[] = JSON.parse(attempt);

            console.log(nuevointento);

            attemptsArray.push(nuevointento);

            //crear nueva entrada de la BD

            const new_game = new GameSchema();

            new_game._username = foundgame._username;

            new_game._points = foundgame._points;

            new_game._attempts = attemptsArray;

            //borrar antigua entrada BD

            await foundgame.deleteOne();

            //introducir nueva entrada
                
            await new_game.save();

            return true;

        }


    }

    //BD functions

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

    /*
    
    ATTEMPTS:

    [[], [], [], [], []]   --> contiene 5 intentos

    [[{value: "", color: ""}, {value: "", color: ""}, {value: "", color: ""}, ...], [{}], [{}], [{}], [{}]]
    
    
    */

}

export default GameDAO;