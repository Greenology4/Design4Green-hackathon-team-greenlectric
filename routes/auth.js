const router = require('express').Router();
const fs = require('fs');

const bcrypt = require('bcryptjs')

const file_path = 'data1.json';

router.get('/login', (req, res) => {
    if (req.session.info) {
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
                req.session.info = {};
                req.session.info.username = Object.keys(info.users)[0];
                req.session.info.foyer = info.users[username]['Foyer'];
                req.session.info.house = info.Houses[req.session.info.foyer]
                req.session.info.owner = info.owner[req.session.info.foyer]
                req.session.info.renter = info.renter[req.session.info.foyer]
                req.session.info.consumption = info.consumption[req.session.info.foyer]
                return res.redirect('/user')                
            } else {
                return res.redirect('/login')    
            }
        } catch(e) {
            console.log(e);
            return res.redirect('/login')
        }
        
    
    });
});

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
        password = body.password,
        confirm_password = body.confirm_password,
        foyer = body.foyer,
        house_type = body.house_type,
        surface = body.surface,
        pieces = body.pieces,
        chauffage = body.chauffage,
        year_of_construction = body.year_of_construction
        house_no = body.house_no;
        street = body.street;
        pincode = body.pincode,
        city = body.city,
        owners_firstname = body.owners_firstname,
        owners_lastname = body.owners_lastname
        renters_firstname = body.renters_firstname,
        renters_lastname = body.renters_lastname

        if(password == confirm_password) {
            fs.readFile(file_path, (err, data) => {
                if (err) throw err;
                bcrypt.hash(password, 10, (err, hash) => {
                    var info = JSON.parse(data);
                    info.users[username] = {
                        "Foyer": foyer,
                        "password": ""
                    }
                    info['users'][username]['password'] = hash;
                    info['Houses'][foyer]['type'] = house_type;
                    info['Houses'][foyer]['surface'] = surface;
                    info['Houses'][foyer]['pieces'] = pieces;
                    info['Houses'][foyer]['chauffage'] = chauffage;
                    info['Houses'][foyer]['annee-de-construction'] = year_of_construction;
                    info['Houses'][foyer]['no-de-voie'] = house_no;
                    info['Houses'][foyer]['voie'] = street;
                    info['Houses'][foyer]['code-postal'] = pincode;
                    info['Houses'][foyer]['ville'] = city;
                    info['owner'][foyer]['nom'] = owners_lastname;
                    info['owner'][foyer]['prenom'] = owners_firstname;
                    info['renter'][foyer]['nom'] = renter_lastname;
                    info['renter'][foyer]['prenom'] = renter_firstname;
                    
                    fs.writeFile(file_path, JSON.stringify(info), function(err1) {
                        if(err1) {
                            return console.log(err1);
                        }
                        return res.redirect('/login');
                    });
                }); 
            });
        } else {
            return res.redirect('/signup');
        }
});

module.exports = router;