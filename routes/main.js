const router = require('express').Router();
const fs = require('fs');
const file_path = 'file_paths.json';
var dateFormat = require('dateformat');

//Get all houses info 


router.get('/test', (req, res) => {
    var home = 'uploads/a35174ade58fc42b92c5f2a30e17625b';
    return res.download(`./${home}`, 'document_uploaded.pdf');
})



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
