const nodemailer = require("nodemailer");

const handleOTPGeneration = (req, res, knex) => {

    const { email } = req.body;

    knex('login').select('*').where('email', email)
        .then(data => {
            if (data.length) {

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'cryptoverse810@gmail.com',
                        pass: 'yzoj3Q*fnrp'
                    }
                });

                let random = Math.floor(Math.random() * 89999999)+10000000; // generate random 8 digit number
                let randomString = random.toString();

                transporter.sendMail({
                    from: 'cryptoverse810@gmail.com', // sender address
                    to: email,
                    subject: 'Cryptoverse Account OTP',
                    html: `<h2>This is your OTP: ${randomString}</h2>`, // html body
                })
                    .then(info => {
                        res.status(200).json(randomString);
                    })
                    .catch(() => {
                        console.log('Error sending OTP');
                    })
            }
            else {
                res.status(200).json('Email does not exist');
            }
        })

}

module.exports = {
    handleOTPGeneration: handleOTPGeneration
}