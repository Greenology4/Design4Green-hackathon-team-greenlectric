const router = require('express').Router();
const fs = require('fs');
const file_path = 'data1.json';
var dateFormat = require('dateformat');

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



router.post('/:id', (req, res) => {
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




module.exports = router;

