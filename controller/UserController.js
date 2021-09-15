const User=require('../models/User');

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
        user.save()
        .then(()=>res.send(user))
        .catch(next);
    }

    update(req,res,next){
        User.updateOne({_id: req.params.id}, req.body)
        .then(()=>res.send("update successfull !!!"))
        .catch(next);
    }

}

module.exports=new UserController;