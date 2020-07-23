
const Post = require('../database/models/Article');
const path = require('path');

module.exports = (req, res) =>{

    const { image }  = req.files
    const _dirname = path.resolve(`public/articles`, image.name)
    const uploadFile = _dirname;



    image.mv(uploadFile, (error) =>{
         Post.create(
            {
                ...req.body,
                image: `/articles/${image.name}`
            }, 

            (error, post)=>{
            res.redirect('/') 
            })
    })

}