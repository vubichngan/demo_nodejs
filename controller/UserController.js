const User=require('../models/User');
const passport=require('passport');
const _ =require('lodash');
const { use } = require('passport');
const bcrypt= require('bcrypt');


class UserController{
    
    index(req,res){
        User.find({},function(err,user){
            if(!err){
                res.send(user);
            }else{
                res.status(400).json({Error:'ERROR!!!'});
            }
        });
    }

    create(req,res,next){
        const user=new User(req.body);
        user.save((err,doc)=>{
            if(!err)
                res.json(doc)
            else{
                if(err.code===11000)
                    res.status(422).json(['Duplicate user name found.']);
                else
                    return next(err);
            }

        })
    }

    delete(req,res,next){
        User.deleteOne({_id: req.params.id})
        .then(()=>res.json("Delete successfull"))
         .catch(next);
    }

    update(req,res,next){
        const user=new User(req.body);
        console.log(user);
        if(user.password){
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(user.password,salt,(err,hash)=>{
                  user.password=hash;
                  user.saltSecret=salt;
                  User.updateOne({_id: req.params.id}, user)
                  .then(()=>res.json(user))
                  .catch(next);
                });
              });
        }else {
            User.updateOne({_id: req.params.id}, user)
                  .then(()=>res.json(user))
                  .catch(next);
        }
            
        
    }

    authenticate(req, res, next){
        //call for passport aythentication
        passport.authenticate('local',(err,user,info)=>{
            //error from passport middleware
            if(err) return res.status(400).json(err);
            //register user
            else if(user) return res.status(200).json({"token": user.generateJwt()});
            //unknown user or wrong password
            else return res.status(404).json(info);
        })(req,res);
    }

    userProfile(req,res,next){
        User.findOne({_id: req._id},
            (err,user)=>{
                if(!user)
                    return res.status(404).json({status: false, message:'User record not found.'});
                else
                    return res.status(200).json({status: true, user: _.pick(user,['user_name'])});
            }
        )
    }
}



module.exports=new UserController;