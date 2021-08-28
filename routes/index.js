const Word=require('../models/Word');

function route(app){
    app.get('/', (req, res) => {
        Word.find({},function(err,word){
            if(!err){
                res.json(word);
            }else{
                res.status(400).json({Error:'ERROR!!!'});
            }
        });
    })
}
module.exports=route;
