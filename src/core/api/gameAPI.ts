import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware para analizar los cuerpos JSON de las solicitudes
app.use(express.json());

// Endpoint para generar una nueva palabra para el juego
app.get('/generateWord', (req: Request, res: Response) => {
    // Aquí puedes agregar lógica para generar una palabra para el juego
    const word = generateWord(); // Supongamos que esta función genera una palabra aleatoria
    res.status(200).json({ word });
});

// Endpoint para verificar una palabra ingresada por el jugador
app.post('/checkWord', (req: Request, res: Response) => {
    const { word } = req.body;
    // Aquí puedes agregar lógica para verificar la palabra ingresada por el jugador
    const isValid = checkWord(word); // Supongamos que esta función verifica si la palabra es válida
    res.status(200).json({ isValid });
});

// Función para generar una palabra para el juego (ejemplo)
function generateWord(): string {
    return 'ejemplo'; // Esto es solo un ejemplo, puedes implementar tu propia lógica para generar palabras
}

// Función para verificar una palabra ingresada por el jugador (ejemplo)
function checkWord(word: string): boolean {
    // Esto es solo un ejemplo, puedes implementar tu propia lógica para verificar palabras
    return word === 'ejemplo';
}

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
