import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import UserDAO from '../model/userDAO/userDAO';
import session from 'express-session';

const userdao = UserDAO.getInstance();
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle user login
app.post('/', (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(req.body)
    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password.' });
    }


    userdao.find(username)
    .then((usuario) => {
        // If user not found
        if (!usuario || usuario.getPassword() !== password) {


            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // If user found and password matches
        
        req.session.user = { username: username }; // Aquí se establece la sesión con el nombre de usuario
        console.log(req.session.user);
        res.status(200).json({ message: 'Login successful.', user: { username } });

    })

    .catch((error) => {
        console.error('Error while finding user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    });

});

export default app