const handleUpdate = (req, res, knex,  bcrypt) => {

    const { email, newPassword } = req.body;
    const hash = bcrypt.hashSync(newPassword, 8);
}

module.exports = {
    handleUpdate: handleUpdate
}