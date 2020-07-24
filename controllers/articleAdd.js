module.exports = (req, res) =>{

    //console.log(req.session.userId);

    if(req.session.userId){

        return res.render('article/add')
    }
        res.redirect ("/user/login")
    
}
