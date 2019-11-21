const router = require('express').Router();
const fs = require('fs');

const bcrypt = require('bcryptjs')

const file_path = 'data1.json';

router.get('/login', (req, res) => {
    if (req.session.info) {
        return res.redirect('/');
    }
    res.render('login');
});

router.post('/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    fs.readFile(file_path, (err, data) => {
        if (err) throw err;
        let info = JSON.parse(data);
        try {
            if(bcrypt.compareSync(password, info.users[username]['password'])) {
                if(info.users.D4G2019 === info.users[username] ){
                    res.redirect('admin')
                    req.session.info = {};
                    req.session.info.username = Object.keys(info.users)[0];
                } else{  
                    req.session.info = {};
                    req.session.info.username = Object.keys(info.users)[0];
                    req.session.info.foyer = info.users[username]['Foyer'];
                    req.session.info.house = info.Houses[req.session.info.foyer]
                    req.session.info.owner = info.owner[req.session.info.foyer]
                    req.session.info.renter = info.renter[req.session.info.foyer]
                    req.session.info.consumption = info.consumption[req.session.info.foyer]
                    return res.redirect('/')                
                }  
            } else {
                console.log('c');
                
                return res.redirect('/login')    
            }
        } catch(e) {
            console.log(e);     
            return res.redirect('/login')
        }
        
    
    });
});

router.get('/', isLoggedIn, (req, res) => {
    res.send('Hello');
    
})

router.get('/logout', (req, res) => {
    try {
        delete req.session.info;
        return res.redirect('/login');
    } catch(err) {
        return res.redirect('/login');
    }
})

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.post('/signup', (req, res) => {
    var body = req.body,
        username = body.username,
        email = body.email,
        password = body.password,
        rePassword = body.repassword,
        token = body.token,
        role = body.role;

});

module.exports = router;

function isLoggedIn(req, res, next) {
    console.log(req.session.info);
    
    if (req.session.info) {
        next()
    } else {
        return res.redirect('/login');
    }
}