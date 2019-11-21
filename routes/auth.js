const router = require('express').Router();
const fs = require('fs');

const bcrypt = require('bcryptjs')

const file_path = 'data1.json';

router.get('/login', (req, res) => {
    // if (req.isAuthenticated()) {
    //     return res.redirect('/dashboard');
    // }
    res.render('login');
    // fs.readFile(file_path, (err, data) => {
    //     if (err) throw err;
    //     var info = JSON.parse(data);
    //     // console.log(info.users);
    //     for(let key in info.users) {
    //         bcrypt.hash(info['users'][key]['password'], 10, (err, hash) => {
    //             // console.log(info['users'][key]['password'], hash);
    //             info['users'][key]['password'] = hash;  
    //             console.log(info['users'][key]);
    //         });
    //     }
    //     // console.log(info.users);
    // });
});

router.post('/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    fs.readFile(file_path, (err, data) => {
        if (err) throw err;
        let info = JSON.parse(data);
        // console.log(info);

        try {
            if(bcrypt.compareSync(password, info.users[username]['password'])) {
                console.log("Fuck! It's working");
            } else {
                console.log('Oops! Password incorrect');
                
            }
        } catch(e) {
            console.log('No user found');
            
        }
        
    
    });
});

router.get('/logout', (req, res) => {
    try {
        var loggedInUsername = req.user.username;
        req.logout();
        return res.redirect('/login');
    } catch(err) {
        return res.redirect('/login');
    }
})

router.get('/signup', (req, res) => {
    var query = req.query,
    token = query.token;
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
    if (req.isAuthenticated() && req.user.role == 'admin') {
        next()
    } else {
        return res.redirect('/auth/login');
    }
}