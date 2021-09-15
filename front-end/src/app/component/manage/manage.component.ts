import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  wordList:Word[];
  status: String;
  checkedUserList:any;
  isSelected:boolean;
  isDisableBtn:boolean;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.showWordStatus("chua duyet").subscribe((response: any)=>{
      this.wordList=response;
      this.wordList.forEach(function(element){element.isChecked=false;})
      console.log(response);
      this.status="Da duyet";
      this.isSelected=false;
      this.isDisableBtn=true;
    })
  }

  updateWordStatus(id: any,status: String){
    var word=new Word();
    word.status=status;
    this.clientService.updateWord(id,word).subscribe((response: any)=>{
      console.log(response);
    })
    this.ngOnInit();
  }

  updateWordList(){
    for(var i=0;i<this.checkedUserList.length;i++){
      this.updateWordStatus(this.checkedUserList[i]._id,this.status);
      console.log(this.checkedUserList[i]._id);
    }
    console.log(this.status);
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

}
