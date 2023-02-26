const _ = require('lodash');

const random_get = (req, res) => {
    const randomNumber = _.random(0, 20);

    res.send(randomNumber.toString());
};

module.exports = {
    random_get
};
