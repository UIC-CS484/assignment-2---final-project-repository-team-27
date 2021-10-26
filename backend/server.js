const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.status(200).send('Hi there! Welcome');
})

app.listen(3000, () => {
    console.log('The server is now running on port 3000, and is ready to listen and respond to requests');
});