const User=require('../models/User');

class UserController{
    
    index(req,res){
        User.find({},function(err,user){
            if(!err){
                res.send(user);
                res.json(user);
            }else{
                res.status(400).json({Error:'ERROR!!!'});
            }
        });
    }

    create(req,res,next){
        const user=new Word(req.body);
        user.save()
        .then(()=>res.redirect('back'))
        .catch(next);
    }

    update(req,res,next){
        User.updateOne({_id: req.params.id}, req.body)
        .then(()=>res.redirect('back'))
        .catch(next);
    }
}

module.exports=new UserController;