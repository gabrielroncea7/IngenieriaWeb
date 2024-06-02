import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import UserDAO from '../model/userDAO/userDAO';
import session from 'express-session';

const userdao = UserDAO.getInstance();
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle user login
app.delete('/', (req: Request, res: Response) => {
    req.session.user = {}
    res.sendStatus(200)
});

export default app