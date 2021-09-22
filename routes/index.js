const word=require('./word');
const user=require('./user');

function route(app){
    app.use('/api/user',user);
    app.use('/api/word',word);
    
}
module.exports=route;
 