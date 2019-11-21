const router = require('express').Router();
const fs = require('fs');
const file_path = 'data1.json';
var dateFormat = require('dateformat');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

//Get all houses info 
router.get('/', (req, res) => {
   
    fs.readFile(file_path, (err, data) => {
        if (err) throw err;
        let info = JSON.parse(data);
        //let house = info.Houses
        let consumption = info.consumption
        res.render('admin', {c: consumption});
    });
});

router.post('/',upload.single('myFile'), (req, res) => {
    console.log('Here');
    
    if(req.body.consumption){
        console.log("1");
        
        let id = req.body.house;
        let user_date = req.body.date
        let consumption = req.body.consumption;
        var now = new Date();
        var date = user_date || dateFormat(now, "dd/mm/yyyy");
        var file_path = 'data1.json';
        fs.readFile(file_path, (err, data) => {
            let info = JSON.parse(data);
            if(info.consumption[id]){
                info.consumption[id][date] = {};
                info.consumption[id][date] = consumption;
                fs.writeFile(file_path, JSON.stringify(info),(err, data)=> {
                    res.sendStatus(200);
                    if(err) throw err;
                })
            } else {
                throw err
            }
            
        });
    } else if(req.file) {
        console.log("2");
        var house = req.body.house ;     
        var path = req.file.path;
        var file_path = 'file_paths.json';
        fs.readFile(file_path, (err, data) => {
            let info = JSON.parse(data);
                info[house] = {};
                info[house] = path;
                fs.writeFile(file_path, JSON.stringify(info),(err, data)=> {
                    res.sendStatus(200);
                    if(err) throw err;
                })
                if(err) throw err
        });
    }
    else{
        console.log("3");
        
    }
});


function isLoggedIn(req, res, next) {
    console.log(req.session.info);
    
    if (req.session.info) {
        next()
    } else {
        return res.redirect('/login');
    }
}




module.exports = router;

