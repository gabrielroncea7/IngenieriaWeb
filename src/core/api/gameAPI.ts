import express, { Request, Response } from 'express';

const app = express();

// Middleware para analizar los cuerpos JSON de las solicitudes
app.use(express.json());


interface ResponesGameAPI{
    wordChecked: Array<{
        letter: string,
        color: string
    }>,
    win: Boolean,
    points: number
}


// Devuelve el tamaño de la palabra
app.get('/', (req: Request, res: Response) => {
    // Aquí puedes agregar lógica para generar una palabra para el juego
    const word = generateWord(); // Supongamos que esta función genera una palabra aleatoria
    res.status(200).json({ word });
});


// Endpoint para verificar una palabra ingresada por el jugador
app.post('/', (req: Request, res: Response) => {
    const { word } = req.body;
    // Aquí puedes agregar lógica para verificar la palabra ingresada por el jugador
    const isValid = checkWord(word); // Supongamos que esta función verifica si la palabra es válida
    res.status(200).json({ isValid });
});






export default app

