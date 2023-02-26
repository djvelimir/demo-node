const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', (req, res) => {
    const randomNumber = _.random(0, 20);

    res.send(randomNumber.toString());
});

module.exports = router;
