const Users = require("../database/models/Users")



module.exports = (req, res, next) => {
    
    //connecte toi dans la base de donnée

    Users.findById(req.session.userId,(error, user) =>{

      //  console.log(error, user);
        if(error || !user){
            return res.redirect('/user/login')
        }
        next()
    })

    //vérifier le user 


    //si il est dans la base de donnée 


    //sinon tu le rediriges
}