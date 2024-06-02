import { User } from '../../domain/user/User';
import { Email } from '../../domain/email/Email';
import { Word } from '../../domain/word/Word';
import { Game } from '../../domain/game/Game';
import { Attempt } from '../../domain/attempt/Attempt';
import WordDAO from '../../model/wordDAO/wordDAO'
import UserDAO from '../../model/userDAO/userDAO'
import GameDAO from '../../model/gameDAO/gameDAO'
import axios from 'axios';
import { Letter } from '../../domain/letter/Letter';

export interface ResponesGameAPI{
    wordChecked: Array<{
        letter: string,
        color: string
    }>,
    win: Boolean,
    points: number
}

export class GameManager {

    
    //Accede a APIDiccionario, comprueba que sea un objeto WORD y lo devuelve.
    async generateWord(): Promise<Word | null> {

        try {
            let word
            do{
                //Llamada a la API
                const response = await axios.get('https://clientes.api.greenborn.com.ar/public-random-word');
                //Extraemos la palabra del repsone
                const palabra = response.data[0];
                //Comprobamos que sea un objeto WORD

                word = Word.create(palabra, new Date());
            }while(word === null)

            return word
        } catch (error) {
            console.error('Error generating word:', error);
            return null;
        }
    }
    //

    //recibir como parametro el usuario, y que desde la bdd saquemos los intentos
    //Comprueba la fecha de la palabra. Si es de hoy perfecto, seguimos. Sino se llama a generateWord para conseguir una nueva.
    async checkWord(palabra: string, usuario: string): Promise<ResponesGameAPI | null> {
        // LOGICA PARA COMPROBAR LA FECHA DE LA PALABRA
        // Instanciamos worddao
        const worddao = WordDAO.getInstance();
        let ultimapalabra: Word | null = await worddao.find();
        // Instanciamos gamedao
        const gamedao = GameDAO.getInstance();

        let now = new Date();
        let year = now.getFullYear();
        let month = (now.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados, por eso se suma 1
        let day = now.getDate().toString().padStart(2, '0');
        let newformattedDate = `${year}-${month}-${day}`;

        if (!ultimapalabra || (ultimapalabra !== null && ultimapalabra.getFormattedDate() != newformattedDate)) {
            const wordCreated = await this.generateWord()
            if(wordCreated !== null){
                await worddao.addWord(wordCreated.get())
            }
            ultimapalabra = wordCreated
        }

        const lastGame: Game | null = await gamedao.getLastGame(usuario)
        
        if(lastGame !== null && this.formatDAte(lastGame.getDate()) === newformattedDate && (lastGame.getAttempts().length >= 6 || lastGame.getPoints() !== 0)){
            return null
        }

        if (ultimapalabra !== null && ultimapalabra.get().toLowerCase() === palabra.toLowerCase()) {
            // LOGICA PARA COMPROBAR LOS INTENTOS A PARTIR DE UN USUARIO DE LA BDD
            //Si las palabras son iguales, ha ganado. Se añaden los puntos y se devuelve el objeto ResponesGameAPI. Todas las letras seran de color verde.
            
            // Instanciamos userdao
            let wordChecked: Array<{
                letter: string,
                color: string
            }> = []

            
            for(let i = 0 ; i < palabra.length ; i++){
                if(palabra.toLowerCase()[i] === ultimapalabra.get().toLowerCase()[i]){
                    wordChecked.push({
                        letter: palabra.toLowerCase()[i],
                        color: 'green'
                    })
                }
            }

            let letterArray: Array<Letter> = []

            for(let i = 0 ; i < wordChecked.length ; i++){

                const letter = Letter.jsonCreate({
                    value: wordChecked[i].letter,
                    color: wordChecked[i].color
                })
                if(letter !== null){
                    letterArray.push(letter)
                }
            }

            let points
            //Ha ganado a la primera
            if(lastGame === null || this.formatDAte(lastGame.getDate()) !== newformattedDate){
                const attempt: Attempt | null = Attempt.create(1, letterArray)
                if(attempt !== null){
                    gamedao.addGame(usuario, attempt)
                }
                points = this.calcPoints(1)
            }
            else{
                const attempt: Attempt | null = Attempt.create(lastGame.getAttempts().length + 1, letterArray)
                if(attempt !== null){
                    gamedao.addAttempt(usuario, attempt)
                }
                points = this.calcPoints(lastGame.getAttempts().length + 1)
            }

            await this.addPoints(usuario, points)
            
            const respuesta: ResponesGameAPI = {
                wordChecked: wordChecked,
                win: true,
                points: points
            }

            return respuesta
            
        }

        //FRAN
        else if(ultimapalabra !== null){
            let wordChecked: Array<{
                letter: string,
                color: string
            }> = []

            for(let i = 0 ; i < palabra.length ; i++){
                if(palabra.toLowerCase()[i] === ultimapalabra.get().toLowerCase()[i]){
                    wordChecked.push({
                        letter: palabra.toLowerCase()[i],
                        color: 'green'
                    })
                }
                else if(this.isInWord(palabra.toLowerCase()[i], ultimapalabra.get())){
                    wordChecked.push({
                        letter: palabra.toLowerCase()[i],
                        color: 'yellow'
                    })
                }
                else{
                    wordChecked.push({
                        letter: palabra.toLowerCase()[i],
                        color: 'red'
                    })
                }
            }

            let letterArray: Array<Letter> = []

            for(let i = 0 ; i < wordChecked.length ; i++){

                const letter = Letter.jsonCreate({
                    value: wordChecked[i].letter,
                    color: wordChecked[i].color
                })
                if(letter !== null){
                    letterArray.push(letter)
                }
            }

            if(lastGame === null || this.formatDAte(lastGame.getDate()) !== newformattedDate){
                const attempt: Attempt | null = Attempt.create(1, letterArray)
                if(attempt !== null){
                    gamedao.addGame(usuario, attempt)
                }
            }
            else{
                const attempt: Attempt | null = Attempt.create(lastGame.getAttempts().length + 1, letterArray)
                if(attempt !== null){
                    gamedao.addAttempt(usuario, attempt)
                }
            }         
            
            const respuesta: ResponesGameAPI = {
                wordChecked: wordChecked,
                win: false,
                points: -1
            }

            return respuesta
        }
        return null
    }

    formatDAte(date: Date): string{
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados, por eso se suma 1
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`
    }

    //Si la letra que se pasa como parametro esta en la palabra, se devuelve true. Sino, false.
    isInWord(letter: string, word: string): boolean{
        if(letter.length === 1){
            for(let i = 0 ; i < word.length ; i++){
                if(word.toLowerCase()[i] === letter){
                    return true
                }
            }
            return false
        }
        else{
            return false
        }
    }

    //addpoints
    async addPoints(username: string, points: number): Promise<boolean> {
        var userDAO = UserDAO.getInstance();
        const gameDao = GameDAO.getInstance()
        await gameDao.addPoints(username, points)
        return userDAO.find(username).then(async (user) => {  
            if (user != null){
                user.setPoints(user.getPoints() + points);
                await userDAO.updateUser(user);

                return true;
            }
            else{

                return false;

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
    

    async getLastGame(usuario: string): Promise<Game | null> {
        const gamedao = GameDAO.getInstance();
        const game = await gamedao.getLastGame(usuario);

        if(game){

            return game

         }
        else{
                
            return null
        }
        
    }

    //Devuelve el tamaño de la palabra y todas las condiciones del checkword
    async getLenghtWord(): Promise<number> {

        const wordDao = WordDAO.getInstance();
        let ultimapalabra: Word | null = await wordDao.find();

        let now = new Date();
        let year = now.getFullYear();
        let month = (now.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados, por eso se suma 1
        let day = now.getDate().toString().padStart(2, '0');
        let newformattedDate = `${year}-${month}-${day}`;

        if (!ultimapalabra || (ultimapalabra !== null && ultimapalabra.getFormattedDate() != newformattedDate)) {
            const wordCreated = await this.generateWord()
            if(wordCreated !== null){
                await wordDao.addWord(wordCreated.get())
            }
            ultimapalabra = wordCreated
        }
        const lastWord = await wordDao.find()

        if(lastWord !== null){
            return lastWord.get().length
        }
        else{
            return -1
        }
    }
}  
export default GameManager;