import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';


@Component({
  selector: 'app-list-word',
  templateUrl: './list-word.component.html',
  styleUrls: ['./list-word.component.css']
})
export class ListWordComponent implements OnInit {

   status: String;
  
  constructor(private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent) { }

  ngOnInit(): void {
  }

  reset(component){
    this.clientService.getWord().subscribe((response: any)=>{
      component.wordList= response.filter(s => s.user_name==this.userComponent.userName);
      component.wordList= response.filter(s => s.status===this.status);
      component.wordList.forEach(function(element){element.isChecked=false;})
      component.wordListFilter=component.wordList;
      component.isDisableBtn=true;
      component.isSelected=false;
    })
  }

  getWordId(id: String){
    this.userComponent.wordId=id;
  }

  checkUncheckAll(component) {
    for (var i = 0; i < component.wordList.length; i++) {
      component.wordList[i].isChecked = component.isSelected;
    }
    this.getCheckedItemList(component);
  }
   
  isAllSelected(component) {
    component.isSelected = component.wordList.every(function(item:any) {
        return item.isChecked == true;
      })
    this.getCheckedItemList(component);
  }
  
  getCheckedItemList(component){
    component.checkedUserList = [];
    for (var i = 0; i < component.wordList.length; i++) {
      if(component.wordList[i].isChecked)
      component.checkedUserList.push(component.wordList[i]);
    }
    if(component.checkedUserList.length>0){
      component.isDisableBtn=false;
    }else{
      component.isDisableBtn=true;
    }
  }

  deleteWord(id:any,component){
    this.clientService.deleteWord(id).subscribe((response: any)=>{
      this.reset(component);
      this.appComponent.alertWithSuccess(response);
    },err=>{
      this.appComponent.erroAlert('Delete error: '+err);
    }
    )
  }

  updateWordList(component){
    for(var i=0;i<component.checkedUserList.length;i++){
      this.deleteWord(component.checkedUserList[i]._id,component);
    }
  }

  onKey(event, component){
    component.search = event.target.value;
    if(component.search===""){
      component.wordListFilter=component.wordList;
    }else{
      component.wordListFilter= component.wordList.filter(s => s.tu.tu_en.toLowerCase().indexOf(component.search.toLowerCase())!==-1);
    }
  }
}
