import express, { Request, Response } from 'express';
import session from 'express-session';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());



declare module 'express-session' {
    interface SessionData {
        user: { [key: string]: any };
    }
}


app.get('/', (req: Request, res: Response) => {
    const username = req.session.user ? req.session.user.username : null;
    return res.status(200).json({ username });
});

app.delete('/', (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to destroy session.' });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ success: true });
    });
});

export default app;
