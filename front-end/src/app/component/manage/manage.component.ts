import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';


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
  userDetails;
  userId;
  constructor(private clientService: ClientService, private appComponent: AppComponent, private router: Router) { }

  ngOnInit(): void {
    this.clientService.getUserProfile().subscribe(
      res=>{
        this.userDetails=res['user'].user_name;
      },
      err=>{
        console.log(err);
      });
    this.userId= this.clientService.getUserPayload()._id;
    this.reset();
  }

  onLogout(){
    this.appComponent.onLogout(this);
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
    word.status=status;
    this.clientService.updateWord(id,word).subscribe((response: any)=>{
      this.ngOnInit();
      console.log(response);
    })
    
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
