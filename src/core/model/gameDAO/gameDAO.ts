import GameSchema from '../Schema/GameSchema'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Attempt } from '../../domain/attempt/Attempt'
import { Game } from '../../domain/game/Game';

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


    public async getLastGame(username: String): Promise<Game | null>{ //Devuelve el ultimo Game del usuario indicado (Promise < False || Game >)

        const foundgame = await GameSchema.findOne({_username: username}).sort({createdAt: -1});
        
        if(!foundgame){
            
            console.log("No se ha encontrado el game en la base de datos");

            return null;

        }
        else{

            const latestGame = new Game(foundgame._attempts, foundgame.createdAt, foundgame._points || 0);
            
            return latestGame; //gameDAO retorna el dato

        }

    }

    public async addGame(username: string, intento: Attempt){ //DONE

        //crear esquema con los datos obtenidos

        const gameSchema = new GameSchema;

        gameSchema._username = username;

        gameSchema._points = 0;

        const attempts_array =[intento.getWord()] 

        gameSchema._attempts = attempts_array;

        //introducir esquema en la BD

        try{

            await gameSchema.save();

            return true;

        }catch(error){

            console.log(error);

            return false;

        }

    }

    public async addPoints(username: string, points: number): Promise<Boolean>{ //ARREGLAR

        const foundgame = await GameSchema.findOne({_username: username}).sort({createdAt: -1});

        if(foundgame){

            await GameSchema.updateOne({_id: foundgame._id}, {points: points}); //se borra la antigua partida sin puntos

            return true;

        }
        else{

            return false;

        }

    } 

    public async addAttempt(username: String, intento: Attempt){ //DONE

        //recuperar lastGame

        const foundgame = await GameSchema.findOne({_username: username}).sort({createdAt: -1})

        if(!foundgame){

            console.log("Game no encontrado");

            return false;

        }
        else{

            //actualizar lastGame

            const attemptsArray = foundgame._attempts; //vector con los intentos

            attemptsArray.push(intento.getWord()); //realizamos push del nuevo vector letter en el vector de intentos

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