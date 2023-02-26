const express = require('express');
const router = express.Router();
const randomController = require('../controllers/randomController');

router.get('/', randomController.random_get);

module.exports = router;
