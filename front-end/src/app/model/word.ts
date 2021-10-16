import { DeclarationListEmitMode } from "@angular/compiler";

export class Word {
    _id?:String;
    tu:{
        tu_en: String,
        tu_loai:String,
        phien_am:String
      };
    nghia_en:String;
    nghia_vi:String;
    anh:String;
    tu_lienquan:[{
        id_tu: Number,
      }];
    id_user:Number;
    status:String;
    id_manager:Number;
    isChecked:boolean;
    comment: String;
}
