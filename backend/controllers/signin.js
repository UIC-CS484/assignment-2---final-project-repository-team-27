const handleSignin = (req, res, knex, bcrypt) => {

    const { email, password } = req.body;

    knex('login').select('*').where('email', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].password);
            if (isValid) {
                return knex('users').select('*').where('id', data[0].id).then(user => {
                    req.session.isAuth = true;
                    res.status(200).json(user[0]);
                })
            }
            else
                res.status(400).json('Incorrect password');
        })
        .catch(() => res.status(400).json('Incorrect username'))
        
}

module.exports = {
    handleSignin: handleSignin
}