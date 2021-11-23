const express = require('express');
const app = express();

require('dotenv').config()
const bcrypt = require('bcryptjs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const sqlite3 = require('sqlite3').verbose();
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './cryptodb.db',
    },
});

const passport = require('passport');
const initializeConfig = require('./passport-config');

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
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 31 }
}))
app.use(cookieParser(process.env.SECRET))
app.use(passport.initialize());
app.use(passport.session());

app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) });
app.get('/home', (req, res) => { home.handleAPICall(req, res) });

app.listen(3001, () => { console.log('The server is now running on port 3001, and is ready to listen and respond to requests'); });