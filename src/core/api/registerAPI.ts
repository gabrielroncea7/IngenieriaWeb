import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware para analizar los cuerpos JSON de las solicitudes
app.use(express.json());

// Endpoint para manejar el registro de usuarios
app.post('/api/signup', (req: Request, res: Response) => {
    const user = req.body;

    // Aquí puedes agregar lógica para registrar al usuario
    if (isValidUser(user)) {
        res.status(200).json({ status: 'registered' });
    } else {
        res.status(400).json({ status: 'error' });
    }
});

// Función para verificar si el usuario es válido (ejemplo)
function isValidUser(user: any): boolean {
    // Esto es solo un ejemplo, puedes implementar tu propia lógica de validación
    const { username, email, password } = user;
    return username && email && password; // Verificar que los campos obligatorios estén presentes
}

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
