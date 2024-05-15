import express, { Request, Response } from 'express';
import UserDAO from '../model/userDAO/userDAO';

const app = express();

const userdao = UserDAO.getInstance();

// Middleware para analizar los cuerpos JSON de las solicitudes
app.use(express.json());

// Endpoint para manejar el registro de usuarios
app.post('/', (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    console.log(username)

    userdao.find(username).then((resultado)=> {
        if (resultado != null) {
            console.log(username)
            return res.status(401).json({ message: 'The user already exists in the database.1' });
        }
        userdao.findByEmail(email).then((resultado)=>
            {
            if (resultado != null) {
                return res.status(401).json({ message: 'The user already exists in the database.2' });
            }
            userdao.addUser(username, email, password, 0, 0, 0).then((resultado)=>{

                if(resultado == true) {
                 res.status(200).json({ message: 'The user has been registered succesfully.', user: { username } });
                }
                else {
                 res.status(500).json({ message: 'Internal server error.' });

                }
            })

            })
    })
    

});

export default app