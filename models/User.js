const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const { Router } = require('express');
const Schema = mongoose.Schema;
const jwt =require('jsonwebtoken');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const User = new Schema({
  _id: Number,
  user_name:{
    type: String,
    require: 'User name can\'t be empty',
    unique: true,
  },
  password: {
    type: String,
    require: 'Password name can\'t be empty',
    minlength: [4, 'Password must be atleast 4 character long']
  },
  permission: String,
  status:String, //kich hoat la 1; khoa la 0
  saltSecret:String,
},
{
  _id:false,
  timestamps:true,
});

User.pre('save',function(next){
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(this.password,salt,(err,hash)=>{
      this.password=hash;
      this.saltSecret=salt;
      next();
    });
  });
});

// methods
User.methods.verifyPassword=function(password){
  return bcrypt.compareSync(password,this.password);
};

User.methods.generateJwt=function(){
  return jwt.sign({_id:this._id,permission: this.permission,status: this.status},
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP
    });
}

User.plugin(AutoIncrement); 
module.exports=mongoose.model('user',User);
