
const Users = require('../database/models/Users');

module.exports = (req, res) => {
    Users.create(
        req.body,() => {
            res.redirect('/')
        }
    )
}