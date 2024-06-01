import { User } from '../../domain/user/User';
import { Email } from '../../domain/email/Email';
import { Word } from '../../domain/word/Word';
import { Game } from '../../domain/game/Game';
import { Attempt } from '../../domain/attempt/Attempt';
import WordDAO from '../../model/wordDAO/wordDAO'
import UserDAO from '../../model/userDAO/userDAO'
import GameDAO from '../../model/gameDAO/gameDAO'
import axios from 'axios';


export class GameManager {

    
    //Accede a APIDiccionario, comprueba que sea un objeto WORD y lo devuelve.
    async generateWord(): Promise<Word | null> {

        try {
            //Llamada a la API
            const response = await axios.get('https://clientes.api.greenborn.com.ar/public-random-word');
            //Extraemos la palabra del repsone
            const palabra = response.data;
            //Comprobamos que sea un objeto WORD

            const isCreated = Word.create(palabra, new Date());
            if (isCreated != null) {
                return isCreated;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error generating word:', error);
            return null;
        }
    }

    //recibir como parametro el usuario, y que desde la bdd saquemos los intentos
    //Comprueba la fecha de la palabra. Si es de hoy perfecto, seguimos. Sino se llama a generateWord para conseguir una nueva.
    async checkWord(palabra: string, usuario: string) {
        // LOGICA PARA COMPROBAR LA FECHA DE LA PALABRA
    
        // Instanciamos worddao
        const worddao = WordDAO.getInstance();
        const ultimapalabra = await worddao.find();
        // Instanciamos gamedao
        const gamedao = GameDAO.getInstance();
    
        if (ultimapalabra != null && ultimapalabra.get() === palabra) {
            let now = new Date();
            let year = now.getFullYear();
            let month = (now.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados, por eso se suma 1
            let day = now.getDate().toString().padStart(2, '0');
            let newformattedDate = `${year}-${month}-${day}`;
    
            if (ultimapalabra.getFormattedDate() == newformattedDate) {
                // LOGICA PARA COMPROBAR LOS INTENTOS A PARTIR DE UN USUARIO DE LA BDD
                gamedao.getLastGame(usuario).then((game) => {
                    if (game != false) {
                        const vector: Attempt[] = game.getAttempts();
                        const numIntentos: number = vector.length;
                        if (numIntentos >= 6) {
                            return false; // Si ya ha habido 6 intentos, no se puede jugar
                        } else {
                            return true; // Si no ha habido 6 intentos, se puede jugar
                        }
                    }
                });
                //
            } else {
                this.generateWord();
                return false;
            }
        }
    }
    

    //addpoints
    async addPoints(username: string, points: number)   {
        var userDAO = UserDAO.getInstance();
        userDAO.find(username).then((user) => {   
            user?.setPoints(user.getPoints() + points);
            if (user != null){
            userDAO.updateUser(user);
            }
        });
}
    
    //calcpoints
    calcPoints(intento: number): number {
        //return points
        switch (intento) {
            case 1:
                return 100;
            case 2:
                return 85;
            case 3:
                return 70;
            case 4:
                return 55;
            case 5:
                return 40;
            case 6:
                return 25;
            default:
                return 0; // Valor por defecto si el intento no es válido
        }
    }
    

    getLastGame(usuario: string) {
        const gamedao = GameDAO.getInstance();
        gamedao.getLastGame(usuario).then((game)=>{

            if(game != false){
                return game
            }
        })
    }

    //Devuelve el tamaño de la palabra y todas las condiciones del checkword
    getLenghtWord() {
        const worddao = WordDAO.getInstance();
        worddao.find().then((word) => {
            if (word != null) {
                return word.get().length;
            }
        })
    }
}  
export default GameManager;