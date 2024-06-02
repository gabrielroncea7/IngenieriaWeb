import express, { Request, Response } from 'express';
import { GameManager, ResponesGameAPI } from '../controller/gameManager/GameManager';

const app = express();

// Middleware para analizar los cuerpos JSON de las solicitudes
app.use(express.json());

// Devuelve el tamaño de la palabra
app.get('/', async (req: Request, res: Response) => {
    // Aquí puedes agregar lógica para generar una palabra para el juego
    const gameManager = new GameManager()

    const length = await gameManager.getLenghtWord()

    res.status(200).send({length: length})
});


// Endpoint para verificar una palabra ingresada por el jugador
app.post('/', (req: Request, res: Response) => {
    const { word } = req.body;
    const { username } = req.body;

    const gameManager = new GameManager();
    gameManager.checkWord(word, username).then((response: ResponesGameAPI | null) => {
        if(response === null){
            res.sendStatus(400)
        }
        else{
            res.status(200).json(response);
        }
    });
});

export default app