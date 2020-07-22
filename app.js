const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const MomentHandlebars = require('handlebars.moment');
MomentHandlebars.registerHelpers(Handlebars);
const {allowInsecurePrototypeAccess,} = require('@handlebars/allow-prototype-access');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
 





const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true, useUnifiedTopology: true})


app.use(express.static('public'))


app.use(methodOverride("_method"));
//route
app.engine('handlebars', exphbs({defaultLayout: 'main',handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');

const Post = require('./database/models/Article')

//get

app.get("/", async (req, res) => {

    const posts = await Post.find({})

    res.render("index",{posts})
})

app.get("/contact", (req, res) => {
    res.render("contact")
})

//articles
app.get('/articles/:id', async (req, res)=>{

    const article = await Post.findById(req.params.id)

    res.render('articles',{article})
})
app.get("/article/add", (req, res) =>{
    res.render('article/add')
})

//post

app.post("/articles/post", (req, res) =>{

    Post.create(req.body, (error, post)=>{
        res.redirect('/')
        
    })
    console.log(req.body); 

})







app.listen(3000 , function() {
    console.log("la page tourne sur le port 3000");
})