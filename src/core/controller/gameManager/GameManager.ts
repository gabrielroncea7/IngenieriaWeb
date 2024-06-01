import { User } from '../../domain/user/User';
import { Email } from '../../domain/email/Email';
import { Word } from '../../domain/word/Word';
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

    //FUNCION ANTIGUA COMENTADA DE generateWord
            /*
        const wordDAO = WordDAO.getInstance();
        try {
            const word = await wordDAO.find();
            return word;
        } catch (error) {
            console.error('Error finding word:', error);
            return null;
        }
        */

    //recibir como parametro el usuario, y que desde la bdd saquemos los intentos
    //Comprueba la fecha de la palabra. Si es de hoy perfecto, seguimos. Sino se llama a generateWord para conseguir una nueva.
    async checkWord(palabra: string): Promise<boolean> 
     {

        //LOGICA DE COMPROBACIÓN DE FECHA
        //Si la palabra es de hoy, seguimos
        
        //Si la palabra no es de hoy, se llama a generateWord

        const wordDAO = WordDAO.getInstance();
        try {
            const word = await wordDAO.find();
            if (word != null && word.get() === palabra) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error checking word:', error);
            return false;
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
    

    //Me espero a que miguel arregle el dao
    //Recibo un json y llamo al metodo jsonConstructor de game y devuelvo el objeto Game
    getLastGame(usuario: string) {
        //
        var gameDAO = GameDAO.getInstance();
        //tenemos un problema, el gamme es un string y lo necesitamos en Object
        var game = gameDAO.getLastGame(usuario);
    }

    //Devuelve el tamaño de la palabra y todas las condiciones del checkword
    getLenghtWord() {
    }
}  
export default GameManager;