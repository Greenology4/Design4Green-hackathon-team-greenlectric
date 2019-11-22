const express = require('express');
const hbs = require("hbs");
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


const authRoute = require('./routes/auth');
const adminRoute  = require('./routes/admin');
const mainRoute  = require('./routes/main');

const PORT = process.env.PORT || 80;

var app = express();

app.use('*/public', express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());                        

app.use(cookieParser());
app.use(session({
  secret: 'codetillyoudie',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 3600000 }
}))

app.use('/', mainRoute);
app.use('/', authRoute);
app.use('/admin', adminRoute);

app.use(function (req, res, next) {
  res.status(404).send('404');
});

hbs.registerHelper("math", function(lvalue, operator, rvalue) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
  }[operator];
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
  
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));