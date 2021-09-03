const express = require('express');
const route=express.Router();
const userController=require('../controller/UserController');


route.post('/create',userController.create);
route.put('/update/:id',userController.update);
route.get('/',userController.index);

module.exports=route;