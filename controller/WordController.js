const cors = require('cors');
const Word=require('../models/Word');

class WordController{
    
    index(req,res,next){
        Word.find({},function(err,word){
            if(!err){
                res.send(word);
            }else{
                res.status(400).json({Error:'ERROR!!!'});
            }
        });
    }

    getOne(req,res,next){
        Word.find({_id: req.params.id},function(err,word){
            if(!err){
                res.send(word);
            }else{
                res.status(400).json({Error:'ERROR!!!'});
            }
        });
    }

    create(req,res,next){
        const word=new Word(req.body);
        word.save()
        .then(()=>res.send(word))
        .catch(next);
        
        
    }

    update(req,res,next){
        Word.updateOne({_id: req.params.id}, req.body)
        .then(()=>res.send("update successfull !!!"))
        .catch(next);
    }

    delete(req,res,next){
        Word.deleteOne({_id: req.params.id})
        .then(()=>res.send("req.params.id"))
         .catch(next);
    }
}

module.exports=new WordController;