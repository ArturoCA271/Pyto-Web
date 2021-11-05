const express = require('express');
const router = express.Router();


router.get('/viento', (req, res) => {
    res.render('curso_viento.html');
});

module.exports = router;