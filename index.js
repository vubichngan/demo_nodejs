const express = require('express');
const morgan = require('morgan');

const db=require('./config/db');

//Connect database
db.connect();

const app = express()
const port = 3000

const route=require('./routes');

app.use(morgan('combined'));

route(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})