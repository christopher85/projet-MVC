const Users = require("../database/models/Users")



module.exports = (req, res, next) => {
    
    if(req.session.userId){
        return res.redirect('/article/add')
    }
    next()
}