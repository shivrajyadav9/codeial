const express = require('express');
const app = express();
const port = 4000;

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})