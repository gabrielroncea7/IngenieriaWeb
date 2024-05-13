import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import UserDAO from '../model/userDAO/userDAO';

const userdao = UserDAO.getInstance();

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle user login
app.post('/api/login', (req: Request, res: Response) => {
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
        res.status(200).json({ message: 'Login successful.', user: { username } });

    })

    .catch((error) => {
        console.error('Error while finding user:', error);
        res.status(500).json({ message: 'Internal server error.' });
    });

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});