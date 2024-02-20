import mongoose from 'mongoose';
import env from './environment.js';

// mongoose.connect(`mongodb://0.0.0.0:27017/${env.db}`);
mongoose.connect(`mongodb+srv://shivraj:mongodbcluster@cluster0.fk9lx9t.mongodb.net/?retryWrites=true&w=majority`)

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function () {
    console.log('connected to Database :: MongoDB');
});

export default db;
