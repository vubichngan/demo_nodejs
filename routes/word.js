const express = require('express');
const cors=require('cors');
const route=express.Router();
const wordController=require('../controller/WordController');


route.post('/create',wordController.create);
route.put('/update/:id',wordController.update);
route.delete('/delete/:id',wordController.delete);
route.get('/status/:status',wordController.getStatus);
route.get('/word_vi/:word',wordController.getWord_vi);
route.get('/word_en/:word',wordController.getWord_en);
route.get('/:id',wordController.getId);
route.get('/',wordController.index);


module.exports=route;