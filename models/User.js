const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const { Router } = require('express');
const Schema = mongoose.Schema;
const jwt =require('jsonwebtoken');


const User = new Schema({
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
  status:String,
  saltSecret:String,
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
  return jwt.sign({_id:this._id},
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP
    });
}

module.exports=mongoose.model('user',User);
