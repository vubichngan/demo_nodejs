import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { ManageComponent } from '../manage.component';

@Component({
  selector: 'app-neet-to-be-approved',
  templateUrl: './neet-to-be-approved.component.html',
  styleUrls: ['./neet-to-be-approved.component.css']
})
export class NeetToBeApprovedComponent implements OnInit {
  
  search='';
  wordList:Word[];
  wordListFilter:Word[];
  status: String;
  checkedUserList:any;
  isSelected:boolean;
  isDisableBtn:boolean;
  constructor(private clientService: ClientService,private manageComponent:ManageComponent) { }

  ngOnInit(): void {
    this.reset();
  }

  reset(){
    this.clientService.getWord().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.status=='Chưa duyệt');
      this.wordList.forEach(function(element){element.isChecked=false;})
      this.wordListFilter=this.wordList;
      this.status="Đã duyệt";
      this.isSelected=false;
      this.isDisableBtn=true;
    })
  }
  
    updateWordStatus(id: any,i,status: String){
      var word=new Word();
      word._id=id;
      word.status=status;
      word.tu_lienquan=this.wordListFilter[i].tu_lienquan;
      word.id_manager=this.manageComponent.idUser;
      this.clientService.updateWord(id,word).subscribe((response: any)=>{
        this.reset();
      })
      
    }
  
    updateWordList(){
      for(var i=0;i<this.checkedUserList.length;i++){
        this.updateWordStatus(this.checkedUserList[i]._id,i,this.status);
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

    onKey(event: any){
      this.search = event.target.value;
      if(this.search===""){
        this.wordListFilter=this.wordList;
      }else{
        this.wordListFilter= this.wordList.filter(s => s.tu.tu_en.toLowerCase().indexOf(this.search.toLowerCase())!==-1);
      }
    }
}
