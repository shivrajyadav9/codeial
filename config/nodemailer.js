import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import env from './environment.js';

export const  transporter = nodemailer.createTransport(env.smtp);

export const renderTemplate = (data, relativePath) => {
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

export default transporter;