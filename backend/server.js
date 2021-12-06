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
    useNullAsDefault: true
});

const sessionStore = new KnexSessionStore({
    knex
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const home = require('./controllers/home');
const deleteUser = require('./controllers/deleteUser');
const generateOTP = require('./controllers/generateOTP')
const updatePassword = require('./controllers/updatePassword');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: `${process.env.CLIENT_URL}${process.env.CLIENT_PORT}`,
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 31},
    store: sessionStore
}))
//app.set('trust proxy', 1);

app.get('/', (req, res) => {
    res.status(200).json('Welcome to the server');
})

app.get('/session', (req, res) => {
    if (req.session.isAuth)
        res.status(200).json(req.session.user);
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
app.post('/generateotp', (req, res) => { generateOTP.handleOTPGeneration(req, res, knex) });
app.put('/updatepassword', (req, res) => { updatePassword.handleUpdate(req, res, knex,  bcrypt) });
app.delete('/delete', (req, res) => { deleteUser.handleDelete(req, res, knex) });

app.listen(process.env.PORT || process.env.SERVER_PORT, () => {
    console.log('The server is now running, and is ready to listen and respond to requests'); 
});