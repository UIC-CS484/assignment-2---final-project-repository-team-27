const handleDelete = (req, res, knex) => {

    const { id } = req.body;

    responseString = '';

    req.session.destroy(err => {
        if (err)
            responseString = responseString + 'Server: Error destroying session';
        else
            responseString = responseString + 'Server: Session cleared';
    })

    knex.transaction(trx => {
        trx('users').where('id', id).del()
            .then(data => {
                return trx('login').where('id', id).del()
                    .then(user => {
                        responseString = responseString + ', deleted account successfully.';
                        res.status(200).json(responseString);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(() => {
            responseString = responseString + ', unable to delete account.';
            res.status(200).json(responseString);
        })

}

module.exports = {
    handleDelete: handleDelete
}