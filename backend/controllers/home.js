require('dotenv').config()
const request = require('request');

const handleAPICall = (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://api.coinranking.com/v2/coins?limit=100',
        headers: {
            'x-access-token': process.env.API_KEY
        }
    };

    request(options, (error, response) => {
        if (error)
            console.log('Error communicating with the API to fetch data')
        else
            res.status(200).send(response.body);
    });

}

module.exports = {
    handleAPICall: handleAPICall
}