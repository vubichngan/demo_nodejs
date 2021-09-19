const passport =require('passport');
const localStrategy=require('passport-local');
const mongoose=require('mongoose');

const User=require('../models/User');

passport.use(
    new localStrategy({ usernameField: 'user_name'},
        (username, password, done)=>{
            User.findOne({user_name: username},
                (err,user)=>{
                    if(err)
                    return done(err);
                    // unknown user
                    else if(!user)
                            return done(null,false,{ message:'Username is not registered.'});
                            //wrong password
                    else if(!user.verifyPassword(password))
                        return done(null,false,{message: 'Wrong password.'});
                    else
                        return done(null,user)
                });
        })
)