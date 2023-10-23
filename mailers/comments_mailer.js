import nodeMailer from '../config/nodemailer.js';

//this is another way of exporting a method
let newComment = (comment) => {
    
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'rajsyadav99@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    }, (err, info) => {
        if (err) { console.log('error in sending mail', err); return; }
        console.log('mail delevered', info);
        return;
    })
}

let commentsMailer={newComment};
export default commentsMailer;