import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import UserDAO from '../model/userDAO/userDAO';
import { User } from '../domain/user/User';
import AccountManager from '../controller/accountManager/AccountManager';

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {
    const { username } = req.body;
    //Response with all atributtes of the user unless the password

    const accountManager = new AccountManager()

    const ret = await accountManager.getUser(username)

    if(ret !== null){
        res.status(200).json({
            username: ret.getUsername(),
            email: ret.getEmail(),
            points: ret.getPoints(),
            wins: ret.getWins(),
            gamesplayed: ret.getGamesPlayed()
        });
    }
    else{
        res.sendStatus(404)
    }
});
/*
app.post('/', (req: Request, res: Response) => {
    const { username, email} = req.body;

    //Response with the updated user: boolean


});
*/
app.delete('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const accountManager = new AccountManager()
    const deleted = await accountManager.deleteAccount(username, password)

    if(deleted){
        res.sendStatus(200)
    }
    else{
        res.sendStatus(400)
    }
});

export default app