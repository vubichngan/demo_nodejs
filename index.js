const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const path=require('path');
const db=require('./config/db');

//Connect database
db.connect();

const app = express();
const port = 3000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
const route=require('./routes');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
//app.use(cors());
app.use(morgan('combined'));
//router
route(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})