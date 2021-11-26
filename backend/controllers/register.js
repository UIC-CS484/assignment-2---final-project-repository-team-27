const { passwordCheck, emailCheck, mobileNumberCheck } = require('../validation');

const handleRegister = (req, res, knex, bcrypt) => {

    const { name, email, phone, password } = req.body;
    responseString = '';

    if (passwordCheck(password).length === 0 && emailCheck(email).length === 0 && mobileNumberCheck(phone).length === 0) {
        const hash = bcrypt.hashSync(password, 8);
        knex.transaction(trx => {
            trx('login').insert({ password: hash, email: email })
                .then(data => {
                    return trx('users').insert({ id: data[0], name: name, email: email, phone: phone })
                        .then(user => {
                            trx('users').select('*').where('id', user[0])
                                .then(response => { 
                                    req.session.isAuth = true;
                                    res.status(200).json(response[0]) 
                                })
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
            .catch(() => res.status(200).json('Unable to register'))
    }
    else {
        if (passwordCheck(password).length !== 0)
            responseString += `Password should include: ${passwordCheck(password).join(', ')}\n`;
        if (emailCheck(email).length !== 0)
            responseString += `Email did not meet these requirements: ${emailCheck(email).join(' ')}\n`;
        if (mobileNumberCheck(phone).length !== 0)
            responseString += `Mobile number did not meet these requirements: ${mobileNumberCheck(phone).join(' ')}`;

        res.status(200).json(responseString);
    }

}

module.exports = {
    handleRegister: handleRegister
}