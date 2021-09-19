require('./config/passport');
require('./config/config');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const path=require('path');
const db=require('./config/db');
const passport=require('passport');

//Connect database
db.connect();

const app = express();
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//   next();
// });
const route=require('./routes');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(passport.initialize());
app.use(morgan('combined'));
//router
route(app);
//error handler
app.use((req,res,err,next)=>{
  if(err.name==='ValidationError'){
    var valError=[];
    Object.keys(err.errors).forEach(key=>valError.push(err.errors[key].message));
    res.status(422).send(valError);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})