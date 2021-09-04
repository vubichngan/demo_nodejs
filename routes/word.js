const express = require('express');
const cors=require('cors');
const route=express.Router();
const wordController=require('../controller/WordController');


route.post('/create',wordController.create);
route.put('/update/:id',wordController.update);
route.delete('/delete/:id',wordController.delete);
route.get('/',wordController.index);
route.get('/:id',wordController.getOne);

module.exports=route;