import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import AccountManager from '../controller/accountManager/AccountManager';

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle user login
app.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(req.body)
    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password.' });
    }

    const accountManager = new AccountManager()

    try{
        const logged = await accountManager.signIn(username, password)

        if(logged){
            req.session.user = { username: username };
            res.status(200).json({ message: 'Login successful.', user: { username } });
        }
        else{
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error.' });
    }

});

export default app