const express = require('express');
const router = express.Router();

var session;
router.get('/', (req, res) => {
    session = req.session.save;
    res.render('index.html');

});

module.exports = router;