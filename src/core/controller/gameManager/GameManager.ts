import { User } from '../../domain/user/User';
import { Email } from '../../domain/email/Email';
import { Word } from '../../domain/word/Word';
import WordDAO from '../../model/wordDAO/wordDAO'
import UserDAO from '../../model/userDAO/userDAO'
import GameDAO from '../../model/gameDAO/gameDAO'



class GameManager {


    //Accede a APIDiccionario, comprueba que sea un objeto WORD y lo devuelve.
    async generateWord(): Promise<Word | null> {
        const wordDAO = WordDAO.getInstance();
        try {
            const word = await wordDAO.find();
            return word;
        } catch (error) {
            console.error('Error finding word:', error);
            return null;
        }
    }
    //recibir como parametro el usuario, y que desde la bdd saquemos los intentos
    //Comprueba la fecha de la palabra. Si es de hoy perfecto, seguimos. Sino se llama a generateWord para conseguir una nueva.
    async checkWord(palabra: string): Promise<boolean> 
     {
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