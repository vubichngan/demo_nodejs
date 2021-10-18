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
        }).sort({
            "tu.tu_en":1
        })
    }

getWord(req,res){
    Word.aggregate([
        {$graphLookup:
            {
                from: 'word_lists',
                startWith: "$tu_lienquan.id_tu",
                connectFromField: 'tu_lienquan',
                connectToField: 'id',
                as: 'ds_tlq',
                maxDepth: 1,
                depthField: 'tr',
            }
        },
        {$lookup:
            {
                from:'users',
                localField: 'id_user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {$lookup:
            {
                from:'users',
                localField: 'id_manager',
                foreignField: '_id',
                as: 'manager'
            }
        }
    ],function (err,re) {
            if (err) throw err;
            res.json(re);
        })
}

   createImg(req,res,next){
        const word=new Word(req.body);
        word.anh='http://localhost:3000/images/'+req.file.filename;
        word.save((err,doc)=>{
            if(!err)
                res.json(doc)
            else{res.json(err)}
        });
    }

    create(req,res,next){
        const word=new Word(req.body);
        word.save((err,doc)=>{
            if(!err)
                res.json(doc)
            else{res.json(err)}
        }); 
    }

    update(req,res,next){
        const word=new Word(req.body);
        Word.updateOne({_id: req.params.id}, word)
        .then(()=>res.json("Update successfully"))
        .catch(next);
    }

    updateImg(req,res,next){
        const word=new Word(req.body);
        word.anh='http://localhost:3000/images/'+req.file.filename;
        Word.updateOne({_id: req.params.id}, word)
        .then(()=>res.json("Update successfully"))
        .catch(next);
    }

    delete(req,res,next){
        Word.deleteOne({_id: req.params.id})
        .then(()=>res.json("Delete successfully"))
         .catch(next);
    }
}

module.exports=new WordController;