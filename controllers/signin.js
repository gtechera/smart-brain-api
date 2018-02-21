const handleSignin = (db, bcrypt) => (req, res) =>{
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;
    if (!loginEmail || !loginPassword) {
        return res.json('incorrect submit form')
    } else {
        db('login').select('email', 'hash')
        .where('email', '=', loginEmail)
        .then(data => {
            if (bcrypt.compareSync(loginPassword, data[0].hash)) {
                return db('users').select('*').where('email', '=', loginEmail)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('unable to sign in user'))

            } else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'));

    }
}

module.exports = {
    handleSignin: handleSignin
}