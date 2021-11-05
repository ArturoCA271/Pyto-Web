const express = require('express');
const router = express.Router();


router.get('/cuerda', (req, res) => {
    res.render('curso_cuerda.html');
});

module.exports = router;