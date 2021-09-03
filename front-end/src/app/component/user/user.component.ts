import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  wordList:Word[];
  word:Word;
  tu_en:String;
  nghia_en:String;
  tu_vi:String;
  nghia_vi:String;
  anh:String;
  tu_lienquan:String;
  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientService.showWord().subscribe((response: any)=>{
      this.wordList=response;
      console.log(response);
    })
  }

  createWordUs(){
    var words={
      tu_en: this.tu_en,
      nghia_en:this.nghia_en,
      tu_vi:this.tu_vi,
      nghia_vi:this.nghia_vi,
      anh:this.anh,
      tu_lienquan:this.tu_lienquan,
      status:"chua duyet",
    };
    this.clientService.createWord(words).subscribe((response: any)=>{
      console.log(response);
      this.ngOnInit();
    })
  }

  deleteWord(id:any){
    this.clientService.deleteWord(id).subscribe((response: any)=>{
      console.log(response);
    })
    this.ngOnInit();
  }
}
