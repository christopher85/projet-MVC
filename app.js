const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');




const app = express();
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.static('public'))

//route
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/contact", (req, res) => {
    res.render("contact")
})







app.listen(3000 , function() {
    console.log("la page tourne sur le port 3000");
})