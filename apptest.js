const mongoose = require('mongoose');
const Article = require('./database/models/Article');

mongoose.connect('mongodb://localhost:27017/blog-test',{useNewUrlParser: true, useUnifiedTopology: true});


Article.findByIdAndUpdate("5f181232b6edf1311fdb5395",{
    title: 'Avenger endgame'
},(error, post) =>{
    console.log(error, post);
})


// Article.findById("5f181232b6edf1311fdb5395",(error, articles) =>{
//     console.log(error, articles);
// })


// Article.find({
//     intro: "test d'introduction"
// },(error, articles) =>{
//     console.log(error, articles);
// })



// Article.create({
//     title: "spider-man",
//     intro: "test d'introduction",
//     content: "critique du film spider-man",
// },(error,post)=>{
//     console.log(error, post);
// })