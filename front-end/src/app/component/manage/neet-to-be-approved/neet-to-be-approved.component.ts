import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';


@Component({
  selector: 'app-neet-to-be-approved',
  templateUrl: './neet-to-be-approved.component.html',
  styleUrls: ['./neet-to-be-approved.component.css']
})
export class NeetToBeApprovedComponent implements OnInit {

  wordList:Word[];
  status: String;
  checkedUserList:any;
  isSelected:boolean;
  isDisableBtn:boolean;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.reset();
  }

  reset(){
    
    this.clientService.getWord().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.status=='Chưa duyệt');
      this.wordList.forEach(function(element){element.isChecked=false;})
      console.log(this.wordList);
      this.status="Đã duyệt";
      this.isSelected=false;
      this.isDisableBtn=true;
    })
  }
  
    updateWordStatus(id: any,status: String){
      var word=new Word();
      word._id=id;
      word.status=status;
      console.log(word);
      console.log(id);
      this.clientService.updateWord(id,word).subscribe((response: any)=>{
        console.log(response);
        this.reset();
      })
      
    }
  
    updateWordList(){
      for(var i=0;i<this.checkedUserList.length;i++){
        this.updateWordStatus(this.checkedUserList[i]._id,this.status);
        console.log(this.checkedUserList[i]._id);
      }
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
