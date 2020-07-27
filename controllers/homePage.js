
//Post

const Post = require('../database/models/Article');

module.exports =  async (req, res) => {

    const posts = await Post
    .find({})
    .limit(5)

    res.render("index",{posts})
}