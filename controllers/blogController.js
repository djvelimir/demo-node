const Blog = require('../models/blog');

const blog_get = (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
};

const blog_get_by_id = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

const blog_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    blog_get,
    blog_get_by_id,
    blog_post,
    blog_delete
};
