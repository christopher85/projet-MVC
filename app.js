const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const MomentHandlebars = require('handlebars.moment');
MomentHandlebars.registerHelpers(Handlebars);
const {allowInsecurePrototypeAccess,} = require('@handlebars/allow-prototype-access');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const fileUploads = require('express-fileupload');
const path = require('path');


 
//controller//
//article

const createArticleController = require('./controllers/createArticle')
const homePageController = require('./controllers/homePage')
const articleSingleController = require('./controllers/articleSingle')
const articlePostController = require('./controllers/articlePost')
const middlewareController = require('./middleware/articleValidPost')
const contactController = require('./controllers/contactCreate')

//users

const userCreateController = require('./controllers/userCreate')
const userRegisterController = require('./controllers/userRegister')
const userLoginController = require('./controllers/userLogin')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUploads());

mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})


const { next } = require('process');

app.use(express.static('public'))

app.use(methodOverride("_method"));
//route
app.engine('handlebars', exphbs({defaultLayout: 'main',handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');

//middleware

const middleware = middlewareController
app.use("/articles/post", middleware)

//get

app.get("/", homePageController )


//articles
app.get('/articles/:id', articleSingleController )
app.get("/article/add", createArticleController )
app.post("/articles/post", articlePostController)

//users

app.get('/user/create', userCreateController)
app.post('/user/register', userRegisterController)
app.get("/user/login", userLoginController)

//contact
app.get("/contact", contactController)



app.listen(3000 , function() {
    console.log("la page tourne sur le port 3000");
})