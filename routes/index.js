const word=require('./word');
const user=require('./user');

function route(app){
    app.use('/search',word);
    app.use('/admin/user',user);
    app.use('/user/word',word);
    app.use('/manage/word',word);
    app.use('/user/account',user);
}
module.exports=route;  
