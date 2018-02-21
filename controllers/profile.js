const handleProfile = (req, res, db) => {
    const { id } = req.params;
    // loop database and find matching id
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('User not found')
            }

        })
        .catch(err => res.status(400).json('error founding user'));
}

module.exports = {
    handleProfile: handleProfile
}