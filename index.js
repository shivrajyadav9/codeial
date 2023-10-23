import express from 'express';
import env from './config/environment.js';
import logger from 'morgan';
import viewHelpers from './config/view-helpers.js';

import cookieParser from 'cookie-parser';
const app = express();
viewHelpers.helper(app);
const port = 8000;
import expressLayouts from 'express-ejs-layouts';
import db from './config/mongoose.js';

//used for session cookie
import session from 'express-session';
import passport from 'passport';
import passportJWT from './config/passport-jwt-strategy.js';
import passportGoogle from './config/passport-google-oauth2-strategy.js';
import passportLocal from './config/passport-local-strategy.js';

import MongoStore from 'connect-mongo';
import sassMiddleware from 'node-sass-middleware';
import flash from 'connect-flash';
import customMware from './config/middleware.js';

//setup the chat server to be used with socket.io
import chatserver from 'http';
const chatServer = chatserver.Server(app);
import chatSockets from './config/chat_sockets.js'
const chatSocket = chatSockets.chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listning on port 5000');
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


if (env.name == 'development') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static(env.asset_path));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//set up session using express session and paaaport
//mongostore is used to store the session cookie in the db
app.use(session({
    name: 'codeial',//name of the key
    secret: env.session_cookie_key,//key to generate encripted kays
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://0.0.0.0/codeial_development',
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok mongostore ');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
 app.use(customMware.setFlash);

import indexRouter from './routes/index.js';
app.use('/', indexRouter);

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})
