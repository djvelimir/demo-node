const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const randomRoutes = require('./routes/randomRoutes');

// express app
const app = express();

const dbURI = 'mongodb://localhost:27017';
mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connected to db')

        // listen for the requests
        app.listen(3000);
    })
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

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

// redirects
app.get('/home', (req, res) => {
    res.redirect('/');
});

app.use('/api/blogs', blogRoutes);
app.use('/api/random', randomRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
