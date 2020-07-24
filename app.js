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
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const FLash = require('connect-flash');


 
//controller//
//article

const createArticleController = require('./controllers/articleAdd')
const homePageController = require('./controllers/homePage')
const articleSingleController = require('./controllers/articleSingle')
const articlePostController = require('./controllers/articlePost')
const middlewareController = require('./middleware/articleValidPost')
const contactController = require('./controllers/contactCreate')

//users

const userCreateController = require('./controllers/userCreate')
const userRegisterController = require('./controllers/userRegister')
const userLoginController = require('./controllers/userLogin')
const userLoginAuthController = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

const app = express();
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

const mongoStore = MongoStore(expressSession)

app.use(FLash())

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(
       { mongooseConnection: mongoose.connection}
    )
}))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUploads());

const auth = require("./middleware/auth");
const redirectAuthSuccess = require('./middleware/redierctAuthSuccess');

const { next } = require('process');

app.use(express.static('public'))

app.use(methodOverride("_method"));


//route
app.engine('handlebars', exphbs({defaultLayout: 'main',handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    next()
})


//middleware

const middleware = middlewareController
app.use("/articles/post", middleware)
app.use("/article/add", auth)



//articles
app.get('/articles/:id', articleSingleController );
app.get("/article/add",   createArticleController );
app.post("/articles/post",auth , middleware, articlePostController);

//users

app.get('/user/create', userCreateController);
app.post('/user/register',redirectAuthSuccess, userRegisterController);
app.get("/user/login", userLoginController);
app.post('/user/loginAuth',redirectAuthSuccess, userLoginAuthController);
app.get('/user/logout', userLogout)

//contact
app.get("/contact", contactController);
//get

app.get("/", homePageController );

app.use((req, res) =>{
    res.render('error404')
})

app.listen(3000 , function() {
    console.log("la page tourne sur le port 3000");
})