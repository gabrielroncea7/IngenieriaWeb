import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware para analizar los cuerpos JSON de las solicitudes
app.use(express.json());

// Endpoint para manejar el inicio de sesión
app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Verificación simple de usuario y contraseña (esto es solo un ejemplo, no es seguro)
    if (username === 'usuario' && password === 'contraseña') {
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
