const express = require('express');
const router = express.Router();


router.get('/percusion', (req, res) => {
    res.render('curso_percusion.html');
});

module.exports = router;