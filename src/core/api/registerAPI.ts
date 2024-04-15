import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware para analizar los cuerpos JSON de las solicitudes
app.use(express.json());

// Endpoint para manejar el registro de usuarios
app.post('/register', (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // Validación simple de los campos (esto es solo un ejemplo, no es seguro)
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Se requieren todos los campos: nombre de usuario, correo electrónico y contraseña' });
    }

    // Aquí puedes agregar lógica para guardar el usuario en una base de datos, etc.

    res.status(200).json({ message: 'Usuario registrado exitosamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
