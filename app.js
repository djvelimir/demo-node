const express = require('express');
const _ = require('lodash');

// express app
const app = express();

// listen for the requests
app.listen(3000);

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/random', (req, res) => {
    const randomNumber = _.random(0, 20);

    res.send(randomNumber.toString());
});

// redirects
app.get('/home', (req, res) => {
    res.redirect('/');
});

// 404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});
