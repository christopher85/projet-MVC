const Post = require('../database/models/Article');

module.exports = (req, res)=>{



    Post.updateOne(
    //condition
    
     {_id: req.params.id},
    
    //update
     {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    },
    //option
    {multi:true},
    
    //execute
    function(err){
        console.log(req.body.content)
        console.log(req.body.author)
        console.log(req.params.id)
        if(!err){
          res.redirect('/')
            // res.redirect("/")
        }else{
            res.send(err)
        }
    })
    
    
}


































