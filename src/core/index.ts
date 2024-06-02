// src/index.ts
import express from 'express';
import gameApi from './api/gameAPI'
import loginApi from './api/loginAPI'
import registerApi from './api/registerAPI'
import sessionApi from './api/sessionAPI'
import session from 'express-session'

const app = express();
const port = 4000;

//express-session

app.use(session({
  secret: 'holaestoesunsecreto',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60 //La sesion dura 1 hora
  }
}))

/*
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('User data:', req.session.user);
  next();
});
*/

app.use('/api/game', gameApi)
app.use('/api/login', loginApi)
app.use('/api/signup', registerApi)
app.use('/api/session', sessionApi)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
