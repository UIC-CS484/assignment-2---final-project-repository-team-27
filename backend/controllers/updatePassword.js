const handleUpdate = (req, res, knex, bcrypt) => {

    const { email, newPassword } = req.body;
    const hash = bcrypt.hashSync(newPassword, 8);

    knex('login').update('password', hash).where('email', email)
        .then(data => {
            if (data)
                res.status(200).json('Password updated successfully');
            else
                res.status(200).json('Error updating password');
        })
}

module.exports = {
    handleUpdate: handleUpdate
}