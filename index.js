const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session= require('express-session');
const passport =require('passport');
const passportLocal=require('./config/passport-local-stratgey');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//set up session using express session and paaaport
app.use(session({
    name:'codeial',//name of the key
    //TODO change the secret before deployement in production mode
    secret:'blahSomething',//key to generate encripted kays
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})