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

   async create(req,res,next){
        const word=new Word(req.body);
        word.anh='http://localhost:3000/images/'+req.file.filename;
        res.json(word);
        const createWord=await word.save();
        res.status(201).json({
            word:{
                ...createWord._doc
            }
        })
    }

    update(req,res,next){
        const word=new Word(req.body);
        //res.json(word);
        Word.updateOne({_id: req.params.id}, word)
        .then(()=>res.json(word))
        .catch(next);
    }

    updateImg(req,res,next){
        const word=new Word(req.body);
        word.anh='http://localhost:3000/images/'+req.file.filename;
        //res.json(word)
        Word.updateOne({_id: req.params.id}, word)
        .then(()=>res.json(word))
        .catch(next);
    }

    delete(req,res,next){
        Word.deleteOne({_id: req.params.id})
        .then(()=>res.json("Delete successfully"))
         .catch(next);
    }
}

module.exports=new WordController;