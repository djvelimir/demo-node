const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const _ = require('lodash');

// express app
const app = express();

const dbURI = 'mongodb://localhost:27017';
mongoose.connect(dbURI)
    .then((result) => console.log('Connected to db'))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// listen for the requests
app.listen(3000);

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

// API
app.get('/api/random', (req, res) => {
    const randomNumber = _.random(0, 20);

    res.send(randomNumber.toString());
});

app.get('/api/blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/api/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/api/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete('/api/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
