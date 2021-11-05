const express = require('express');
const router = express.Router();


router.get('/inscripcion', (req, res) => {
    res.render('inscripcion.html');
});

module.exports = router;