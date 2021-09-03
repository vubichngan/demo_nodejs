const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Word = new Schema({
  tu_en:String,
  nghia_en: String,
  tu_vi: String,
  nghia_vi: String,
  anh:String,
  tu_lienquan:String,
  iD_user:String,
  status:String,
});

module.exports=mongoose.model('word_list',Word);
