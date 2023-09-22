const express = require('express');
const app = express();
const port = 4000;

//use express router
app.use('/', require('./routes/index'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})