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

    getId(req,res,next){
        Word.find({_id: req.params.id},function(err,word){
            if(!err){
                res.send(word);
            }else{
                res.status(400).json({Error:'ERROR!!!'});
            }
        });
    }

    getStatus(req,res){
        Word.find({status: req.params.status},function(err,word){
            if(!err){
                res.send(word);
            }else{
                res.status(400).json({Error:'ERROR!!!'});
            }
        });
    }

    getWord_vi(req,res){
        Word.find({tu_vi: req.params.word, status: "da duyet"},function(err,word){
            if(!err){
                res.send(word);
            }else{
                res.status(400).json({Error:'ERROR!!!'});
            }
        });
    }

    getWord_en(req,res){
        Word.find({tu_en: req.params.word,status: "da duyet"},function(err,word){
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
        .then(()=>res.json("Create successfull"))
        .catch(next);
        
        
    }

    update(req,res,next){
        Word.updateOne({_id: req.params.id}, req.body)
        .then(()=>res.json("Update successfull"))
        .catch(next);
    }

    delete(req,res,next){
        Word.deleteOne({_id: req.params.id})
        .then(()=>res.json("Delete successfull"))
         .catch(next);
    }
}

module.exports=new WordController;