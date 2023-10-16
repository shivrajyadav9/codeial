const nodeMailer = require('../config/nodemailer');
const ResetPasswordToken = require('../models/reset_password_token');

exports.resetPassword=(resetPasswordToken)=>{
    let htmlString=nodeMailer.renderTemplate({resetPasswordToken:resetPasswordToken},'users/reset_password.ejs');
    
    nodeMailer.transporter.sendMail({
        from: 'rajsyadav99@gmail.com',
        to: resetPasswordToken.user.email,
        subject: 'Reset Password',
        html: htmlString
    }, (err, info) => {
        if (err) { console.log('error in sending mail', err); return; }
        console.log('mail delevered', info);
        return;
    })
}