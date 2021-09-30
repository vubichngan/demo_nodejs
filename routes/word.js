const express = require('express');
const cors=require('cors');
const route=express.Router();
const wordController=require('../controller/WordController');
const storage=require('../config/ImgHelper');


route.post('/create',storage,wordController.create);
route.put('/update/:id',wordController.update);
route.put('/updateImg/:id',storage,wordController.updateImg);
route.delete('/delete/:id',wordController.delete);
route.get('/',wordController.index);


module.exports=route;