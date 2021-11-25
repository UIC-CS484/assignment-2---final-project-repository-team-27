const express = require('express');
const app = express();
require('dotenv').config()
const bcrypt = require('bcryptjs');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const sqlite3 = require('sqlite3').verbose();
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './cryptodb.db',
    },
});

const sessionStore = new KnexSessionStore({
    knex
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const home = require('./controllers/home');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 31 },
    store: sessionStore
}))

app.get('/', (req, res) => {
    if (req.session.isAuth)
        res.status(200).json(req.session.isAuth);
    else
        res.status(200).json('Server: session does not exist');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) });
app.get('/home', (req, res) => { home.handleAPICall(req, res) });
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err)
            res.status(400).json('Server: Error destroying session');
        else
            res.status(200).json('Session cleared');
    })
});

app.listen(3001, () => { console.log('The server is now running on port 3001, and is ready to listen and respond to requests'); });