const express = require('express');
const _ = require('lodash');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for the requests
app.listen(3000);

app.get('/', (req, res) => {
    const blogs = [
        { name: 'title 1', description: 'description 1' },
        { name: 'title 2', description: 'description 2' },
        { name: 'title 3', description: 'description 3' }
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
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
    res.status(404).render('404', { title: '404' });
});
