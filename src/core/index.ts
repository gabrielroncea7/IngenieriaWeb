// src/index.ts
import express from 'express';
import gameApi from './api/gameAPI'
import loginApi from './api/loginAPI'
import registerApi from './api/registerAPI'
import sessionApi from './api/sessionAPI'

const app = express();
const port = 4000;

app.use('/api/game', gameApi)
app.use('/api/login', loginApi)
app.use('/api/signup', registerApi)
app.use('/api/session', sessionApi)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});