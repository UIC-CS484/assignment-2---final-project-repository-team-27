const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

const database = {
    users: [
        {
            id: 100,
            name: 'alan',
            phone: 872184047,
            email: 'alanharper@gmail.com',
            password: '$2a$08$V9j0xZsn156HE.Qd2DMySuQkkuCJNP1daUX8iM0cXcmwmXp0Mk/k.', //stupefy
            joined: new Date()
        },
        {
            id: 101,
            name: 'charlie',
            phone: 872184048,
            email: 'charlieharper@gmail.com',
            password: '$2a$08$Wyfha1sSEcz1Uhy2rTL2Y.tsH/Cgxu8s1PdpaD0DkqtZw6LMoLbky',    //marco
            joined: new Date()
        },
        {
            id: 102,
            name: 'jake',
            phone: 872184049,
            email: 'jakeharper@gmail.com',
            password: '$2a$08$4wFjg6rkLCbpOqUyOczGUu4mDPW7tITgIqrNIpoU9OwRg1y.DdGNm',    //polo
            joined: new Date()
        }
    ]
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json(database.users);
})

app.post('/signin', (request, response) => {
    const { email, password } = request.body;
    const emailFound = database.users.some((user, i) => {
        userFoundAtIndex = i;
        return user.email === email;
    })
    if (emailFound) {
        bcrypt.compare(password, database.users[userFoundAtIndex].password, (err, res) => {
            if (res)
                response.status(200).json(database.users[userFoundAtIndex]);
            else
                response.status(400).json('Incorrect username/password');
        });
    }
    else
        response.status(400).json('Incorrect username/password');
})

app.post('/register', (req, res) => {
    const { name, email, phone, password } = req.body;
    bcrypt.hash(password, 8, (err, hash) => {
        if (!err) {
            database.users.push({
                id: 103,
                name: name,
                phone: phone,
                email: email,
                password: hash,
                joined: new Date()
            });
            res.status(200).json(database.users[database.users.length - 1]);
        }
        else {
            res.status(400).json('Could not generate hash for password');
        }
    });
})

app.get('/profile/:id', (req, res) => {
    const userFound = database.users.some((user, i) => {
        userFoundAtIndex = i;
        return user.id === parseInt(req.params.id)
    })
    if (userFound)
        res.status(200).json(database.users[userFoundAtIndex]);
    else
        res.status(400).json('User not found');
})

app.listen(3000, () => {
    console.log('The server is now running on port 3000, and is ready to listen and respond to requests');
});