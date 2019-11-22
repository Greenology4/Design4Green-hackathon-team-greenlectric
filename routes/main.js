const router = require('express').Router();
const fs = require('fs');
const file_path = 'file_paths.json';
var dateFormat = require('dateformat');

//Get all houses info 


router.get('/test', (req, res) => {
    var home = 'uploads/a35174ade58fc42b92c5f2a30e17625b';
    return res.download(`./${home}`, 'document_uploaded.pdf');
})



module.exports = router;

