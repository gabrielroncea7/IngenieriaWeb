import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory database for storing user credentials (for demonstration purposes)
const users: { [key: string]: { username: string, password: string } } = {};

// Endpoint to handle user login
app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password.' });
    }

    // Check if the user exists in the database
    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password.' });
    }

    res.status(200).json({ message: 'Login successful.', user: { username } });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
