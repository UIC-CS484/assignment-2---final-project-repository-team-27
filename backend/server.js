const express = require('express');
const app = express();

require('dotenv').config()
const bcrypt = require('bcryptjs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');

const passport = require('passport');
const initializeConfig = require('./passport-config');

const { passwordCheck, emailCheck, mobileNumberCheck } = require('./validation');

const jsonRead = () => {
    return JSON.parse(fs.readFileSync('./mock-database.json', 'utf-8'));
}
const jsonWrite = (data) => {
    fs.writeFileSync('./mock-database.json', JSON.stringify(data, null, 4));
}

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
    cookie: { maxAge: 1000*60*60*24*31 }
}))
app.use(cookieParser(process.env.SECRET))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.status(200).json(jsonRead());
})

app.post('/signin', (request, response) => {
    const { email, password } = request.body;
    const database = jsonRead();
    const emailFound = database.users.some((user, i) => {
        userFoundAtIndex = i;
        return user.email === email;
    })
    if (emailFound) {
        bcrypt.compare(password, database.users[userFoundAtIndex].password, (err, res) => {
            if (res) {

                initializeConfig(passport, database.users[userFoundAtIndex].email, database.users[userFoundAtIndex].password)
                passport.authenticate('local'), (req, res) => {
                        // `req.user` contains the authenticated user.
                        console.log(req, res);
                    }

                response.status(200).json(database.users[userFoundAtIndex]);
            }
            else
                response.status(400).json('Incorrect username/password');
            if (err)
                response.status(400).json('Something went wrong with the hashing function');
        });
    }
    else
        response.status(400).json('Incorrect username/password');
})

app.post('/register', (req, res) => {
    const { name, email, phone, password } = req.body;
    responseString = '';
    const database = jsonRead();

    let tempId = database.users[database.users.length-1].id;
    tempId++;

    if (passwordCheck(password).length === 0 && emailCheck(email).length === 0 && mobileNumberCheck(phone).length === 0) {
        bcrypt.hash(password, 8, (err, hash) => {
            if (!err) {
                database.users.push({
                    id: tempId,
                    name: name,
                    phone: phone,
                    email: email,
                    password: hash,
                    joined: new Date()
                });
                res.status(200).json(database.users[database.users.length - 1]);
                jsonWrite(database);
            }
            else {
                res.status(400).json('Could not generate hash for password');
            }
        });
    }
    else {
        if (passwordCheck(password).length !== 0)
            responseString += `Password did not meet these requirements: ${passwordCheck(password).join(' ')} \n`;
        if (emailCheck(email).length !== 0)
            responseString += `Email did not meet these requirements: ${emailCheck(email).join(' ')} \n`;
        if (mobileNumberCheck(phone).length !== 0)
            responseString += `Mobile number did not meet these requirements: ${mobileNumberCheck(phone).join(' ')}`;

        res.status(400).json(responseString);
    }
})

app.listen(3001, () => {
    console.log('The server is now running on port 3001, and is ready to listen and respond to requests');
});