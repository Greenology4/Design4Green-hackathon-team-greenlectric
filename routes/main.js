const router = require('express').Router();

router.get('/', (req, res) => {
    res.redirect('/login');
})

router.get('/user', isLoggedIn, (req, res) => {
    return res.render('user', {info: req.session['info']});
})

function isLoggedIn(req, res, next) {
    if (req.session.info) {
        next()
    } else {
        return res.redirect('/login');
    }
}

module.exports = router;