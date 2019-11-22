const router = require('express').Router();
const fs = require('fs');
const file_path = 'file_paths.json';
var dateFormat = require('dateformat');

//Get all houses info 


router.get('/file', (req, res) => {
    var home_user = "A"
    var file_path = 'file_paths.json';
    fs.readFile(file_path, (err, data) => {
        let info = JSON.parse(data);
        path =info[home_user]
        return res.download(`./${path}`, 'document_uploaded.pdf');
    });
    
   
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
