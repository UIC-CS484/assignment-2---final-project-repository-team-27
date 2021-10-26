const express = require('express');
const app = express();

const database = {
    users: [
        {
            id: 100,
            name: 'alan',
            phone: 872184047,
            email: 'alanharper@gmail.com',
            password: 'stupefy',
            joined: new Date()
        },
        {
            id: 101,
            name: 'charlie',
            phone: 872184048,
            email: 'charlieharper@gmail.com',
            password: 'marco',
            joined: new Date()
        },
        {
            id: 102,
            name: 'jake',
            phone: 872184049,
            email: 'jakeharper@gmail.com',
            password: 'polo',
            joined: new Date()
        }
    ]
}

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(database.users);
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (email === database.users[2].email && password === database.users[2].password)
        res.status(200).json('success');
    else
        res.status(400).json('Incorrect username/password');
})

app.post('/register', (req, res) => {
    const {name, email, phone, password} = req.body;
    database.users.push({
        id: 103,
        name: name,
        phone: phone,
        email: email,
        password: password,
        joined: new Date()
    });
    console.log(database.users);
    res.status(200).json(database.users[database.users.length-1]);
})

app.listen(3000, () => {
    console.log('The server is now running on port 3000, and is ready to listen and respond to requests');
});