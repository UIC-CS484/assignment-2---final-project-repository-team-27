const nodemailer = require("nodemailer");

const handleOTPGeneration = (req, res, knex) => {

    const { email } = req.body;

    knex('login').select('*').where('email', email)
        .then(data => {
            if(data.length){
                res.status(200).json('Email exists');
            }
            else{
                res.status(200).json('Email does not exist');
            }
        })

}

module.exports = {
    handleOTPGeneration: handleOTPGeneration
}