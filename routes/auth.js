const router = require('express').Router();
const fs = require('fs');

const bcrypt = require('bcryptjs')

const file_path = 'data1.json';

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
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
                console.log('Came');
                
                req.session.info = {};
                req.session.info.username = Object.keys(info.users)[0];
                req.session.info.foyer = info.users[username]['Foyer'];
                req.session.info.house = info.Houses[req.session.info.foyer]
                req.session.info.owner = info.owner[req.session.info.foyer]
                req.session.info.renter = info.renter[req.session.info.foyer]
                req.session.info.consumption = info.consumption[req.session.info.foyer]
                return res.redirect('/')                
            } else {
                console.log('c');
                
                return res.redirect('/login')    
            }
        } catch(e) {
            console.log(e);
            
            console.log('d');
            
            return res.redirect('/login')
        }
        
    
    });
});

router.get('/', isLoggedIn, (req, res) => {
    // console.log(req.session);
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