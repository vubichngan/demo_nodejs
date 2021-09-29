import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  opt:String;
  wordList:Word[];
  tu:string;
  nghia:String;
  tu_lienquan:String;
  wordSearch:String;
  t:String;
  isHide:boolean;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.wordSearch="";
    this.t=this.wordSearch;
    this.opt="vi_vi";
    this.isHide=true;
    
  }

  reset(){
    this.tu="";
    this.nghia="";
    this.tu_lienquan="";
    this.t=this.wordSearch;
    this.isHide=true;
  }
  
  searchWord(text:any){
    this.reset();
    var word =new Word();
    if(text!=""){
      if(this.opt==="en_en"||this.opt==="en_vi"){
        this.clientService.getWord().subscribe((response: any)=>{
          word= response.filter(s => s.tu_en==text);
          if(Object.keys(word).length>0){
            this.isHide=false;
            if(this.opt==="en_en"){
              this.tu=word[0].tu_en;
              this.nghia=word[0].nghia_en;
              this.tu_lienquan=word[0].tu_lienquan;
            }else{
              this.tu=word[0].tu_vi;
              this.nghia=word[0].nghia_vi;
              this.tu_lienquan=word[0].tu_lienquan;
            }
          }
        })
      }else{
        this.clientService.getWord().subscribe((response: any)=>{
          word= response.filter(s => s.tu_vi==text);
          if(Object.keys(word).length>0){
            this.isHide=false; 
            if(this.opt==="vi_vi"){
              this.tu=word[0].tu_vi;
              this.nghia=word[0].nghia_vi;
              this.tu_lienquan=word[0].tu_lienquan;
            }else{
              this.tu=word[0].tu_en;
              this.nghia=word[0].nghia_en;
              this.tu_lienquan=word[0].tu_lienquan;
            }
          }
        })
      }
    }
  }

}
