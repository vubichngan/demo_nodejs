import { Component, OnInit } from '@angular/core';
import { ListWordComponent } from '../list-word.component';
import { Word } from 'src/app/model/word';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html',
  styleUrls: ['./unapproved.component.css']
})
export class UnapprovedComponent implements OnInit {

  search='';
  wordList:Word[];
  wordListFilter:any[];
  checkedUserList:any;
  isDisableBtn:boolean;
  isSelected:boolean;
  p: number = 1;
  constructor(private listWordComponent: ListWordComponent) { }

  ngOnInit(): void {
    this.listWordComponent.reset(this);
    this.listWordComponent.status="Từ chối"
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
    this.listWordComponent.confirmDialogDelete(id, this);
  }

  deleteWordList(){
    this.listWordComponent.confirmDeleteWordList(this);
  }

  onKey(event: any){
    this.listWordComponent.onKey(event,this);
  }
}
