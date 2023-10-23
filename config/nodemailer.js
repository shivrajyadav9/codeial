import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import env from './environment.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let  transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) => {
    let mailHTML;

    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {

            if (err) {
                console.log('ERROR in rendering template');
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}
let nodeMailer={transporter,renderTemplate};
export default nodeMailer;