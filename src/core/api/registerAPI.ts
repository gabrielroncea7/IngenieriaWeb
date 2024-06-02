import express, { Request, Response } from 'express';
import AccountManager from '../controller/accountManager/AccountManager';

const app = express();

// Middleware para analizar los cuerpos JSON de las solicitudes
app.use(express.json());

// Endpoint para manejar el registro de usuarios
app.post('/', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const accountManager = new AccountManager()

    const signed = await accountManager.signUp(username, email, password)

    if(signed){
        req.session.user = { username: username };
        res.status(200).json({ message: 'The user has been registered succesfully.', user: { username } });
    }
    else{
        return res.status(401).json({ message: 'The user already exists in the database.' });
    }
});

export default app