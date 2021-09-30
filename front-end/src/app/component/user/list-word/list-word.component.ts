import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';


@Component({
  selector: 'app-list-word',
  templateUrl: './list-word.component.html',
  styleUrls: ['./list-word.component.css']
})
export class ListWordComponent implements OnInit {

  wordId:String;
  tu_en:String;
  nghia_en:String;
  tu_vi:String;
  nghia_vi:String;
  tu_lienquan:String;
  status: String;
  wordList:Word[];
  checkedUserList:any;
  isDisableBtn:boolean;
  isSelected:boolean;
  constructor(private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent) { }

  ngOnInit(): void {
    this.reset();
  }

  reset(){
    this.clientService.getWord().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.id_user==this.userComponent.userId);
      this.wordList.forEach(function(element){element.isChecked=false;})
      console.log(this.wordList);
      this.isDisableBtn=true;
      this.isSelected=false;
    })
  }

  getWordId(id: String){
    this.userComponent.wordId=id;
  }

  checkUncheckAll() {
    for (var i = 0; i < this.wordList.length; i++) {
      this.wordList[i].isChecked = this.isSelected;
    }
    this.getCheckedItemList();
  }
   
  isAllSelected() {
    this.isSelected = this.wordList.every(function(item:any) {
        return item.isChecked == true;
      })
    this.getCheckedItemList();
  }
  
  getCheckedItemList(){
    this.checkedUserList = [];
    for (var i = 0; i < this.wordList.length; i++) {
      if(this.wordList[i].isChecked)
      this.checkedUserList.push(this.wordList[i]);
    }
    if(this.checkedUserList.length>0){
      this.isDisableBtn=false;
    }else{
      this.isDisableBtn=true;
    }
  }

  deleteWord(id:any){
    this.clientService.deleteWord(id).subscribe((response: any)=>{
      this.reset();
      this.appComponent.alertWithSuccess(response);
    },err=>{
      this.appComponent.erroAlert('Delete error: '+err);
    }
    )
  }

  updateWordList(){
    for(var i=0;i<this.checkedUserList.length;i++){
      this.deleteWord(this.checkedUserList[i]._id);
      console.log(this.checkedUserList[i]._id);
    }
  }
}
