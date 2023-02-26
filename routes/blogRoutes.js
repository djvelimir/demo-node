const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.blog_get);
router.get('/:id', blogController.blog_get_by_id);
router.post('/', blogController.blog_post);
router.delete('/:id', blogController.blog_delete);

module.exports = router;
