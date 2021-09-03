const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  user_name:String,
  password: String,
  status:String,
});

module.exports=mongoose.model('user',User);
