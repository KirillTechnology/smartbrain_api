const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) { return res.status(400).json('Empty value submitted') }

    if (password) { var hash = bcrypt.hashSync(password, 8) }

    db.transaction(trx => {
        trx
        .insert({ hash, email })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            trx
            .insert({
                name: name,
                email: loginEmail[0].email,
                joined: new Date()
            })
            .into('users')
            .returning('*')
            .then(user => {res.json(user[0])})
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}