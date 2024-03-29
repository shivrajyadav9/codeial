import queue from '../config/kue.js';
import commentsMailer from '../mailers/comments_mailer.js';

//process a queue named 'emails' with 
queue.process('emails', function (job, done) {
    console.log('emails Worker is processing a job', job.data);

    commentsMailer.newComment(job.data);
    done();
})

export default queue;

