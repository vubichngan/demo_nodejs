const express = require('express');
const route=express.Router();
const userController=require('../controller/UserController');
const jwtHelper=require('../config/jwtHelper');


route.post('/create',userController.create);
route.post('/authenticate',userController.authenticate);
route.put('/update/:id',userController.update);
route.get('/userProfile',jwtHelper.verifyJwtToken,userController.userProfile);
route.get('/',userController.index);

module.exports=route;
