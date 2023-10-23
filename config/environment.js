import fs from 'fs';
import rfs from 'rotating-file-stream';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '587',
        secure: false,
        auth: {
            user: 'rajsyadav99',
            pass: 'mvvg tfdd oiqn skbi'
        }
    },
    google_client_id: '91239784649-o73tj6jauue87rloqidisn5itq0nmhg9.apps.googleusercontent.com',
    google_client_secret: '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',
    google_callback_url: 'http://localhost:8000/users/auth/google/callback',

    jwt_secret: 'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,//'vXFpttudRhSkEAukVevMuAebBNsTthTw'
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '587',
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD,//'mvvg tfdd oiqn skbi'
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,//'91239784649-o73tj6jauue87rloqidisn5itq0nmhg9.apps.googleusercontent.com',
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,//'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',
    google_callback_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,//'http://localhost:8000/users/auth/google/callback',

    jwt_secret: process.env.CODEIAL_JWT_SECRET,//'iK9UJ0cc6HbOMPfohgMU4Ch0R228Yr26'
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}


export default eval(process.env.CODEIAL_ENVIRONMENT == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT));