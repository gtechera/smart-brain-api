const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
       return res.json('incorrect submit form')
    }else{
        const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            }).into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .insert({
                            name: name,
                            email: loginEmail[0],
                            joined: new Date()
                        })
                        .returning('*')
                        .then(user => {
                            res.json(user[0]);
                        })

                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
            .catch(err => res.status(400).json('unable to register user'));
    }    
}

module.exports = {
    handleRegister: handleRegister
}