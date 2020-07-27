const Post = require('../database/models/Article');

module.exports = (req, res) => {

    Post.findById(
        {_id: req.params.id},

        function(error, article){
            if(!error){
                res.render('put', {
            _id: article.id,
            title: article.title,
            content: article.content,
            author: article.author
                })
            }else{
                res.send(error)
            }
        })
}