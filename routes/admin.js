const router = require('express').Router();
const fs = require('fs');
const file_path = 'data1.json';
var dateFormat = require('dateformat');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

//Get all houses info 
router.get('/', isLoggedIn, (req, res) => {
   
    fs.readFile(file_path, (err, data) => {
        if (err) throw err;
        let info = JSON.parse(data);
        //let house = info.Houses
        let consumption = info.consumption
        res.render('admin', {c: consumption});
    });
});

router.post('/',isLoggedIn ,upload.single('myFile'), (req, res) => {
    
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
   //var file1 = req.file.myFile
   
   

});

router.post('/:id', isLoggedIn, (req, res) => {
    let id = req.params.id;
    let consumption = req.body.consumption;
    var now = new Date();
    var date = dateFormat(now, "dd/mm/yyyy");
    
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
})

function isLoggedIn(req, res, next) {
    console.log(req.session.info);
    
    if (req.session.info) {
        next()
    } else {
        return res.redirect('/login');
    }
}




module.exports = router;

