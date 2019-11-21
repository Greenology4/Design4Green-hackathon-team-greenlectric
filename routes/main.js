const router = require('express').Router();
const fs = require('fs');
const file_path = 'file_paths.json';
var dateFormat = require('dateformat');

//Get all houses info 
router.get('/', (req, res) => {
    /*
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(resp => resp.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = 'todo-1.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      alert('your file has downloaded!'); // or you know, something with better UX...
    })
    .catch(() => alert('oh no!'));*/
    
 
});





module.exports = router;

