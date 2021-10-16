const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Word = new Schema({
  tu:{
    tu_en: String,
    tu_loai:String,
    phien_am:String
  },
  nghia_en: String,
  nghia_vi: String,
  anh:String,
  tu_lienquan:[{
    id_tu: Number,
  }],
  id_user:Number,
  id_manager:Number,
  status:String,
  comment:String,
},{
  timestamps: true,
});
Word.plugin(AutoIncrement, {inc_field: 'id'});
module.exports=mongoose.model('word_list',Word);
