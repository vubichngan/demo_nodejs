import { Component, OnInit } from '@angular/core';
import { ListWordComponent } from '../list-word.component';
import { Word } from 'src/app/model/word';


@Component({
  selector: 'app-not-approved-yet',
  templateUrl: './not-approved-yet.component.html',
  styleUrls: ['./not-approved-yet.component.css']
})
export class NotApprovedYetComponent implements OnInit {

  search='';
  wordListFilter:Word[];
  wordList:Word[];
  checkedUserList:any;
  isDisableBtn:boolean;
  isSelected:boolean;
  constructor(private listWordComponent: ListWordComponent) { }

  ngOnInit(): void {
    this.listWordComponent.reset(this);
    this.listWordComponent.status="Chưa duyệt"
  }

  getWordId(id: String){
    this.listWordComponent.getWordId(id);
  }

  checkUncheckAll() {
    this.listWordComponent.checkUncheckAll(this);
  }

  isAllSelected(){
    this.listWordComponent.isAllSelected(this);
  }

  getCheckedItemList(){
    this.listWordComponent.getCheckedItemList(this);
  }

  deleteWord(id){
    this.listWordComponent.deleteWord(id, this);
  }

  onKey(event: any){
    this.listWordComponent.onKey(event,this);
  }

  updateWordList(){
    this.listWordComponent.updateWordList(this);
  }

}
