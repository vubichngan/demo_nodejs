import { Component, OnInit } from '@angular/core';
import { ListWordComponent } from '../list-word.component';
import { Word } from 'src/app/model/word';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html',
  styleUrls: ['./unapproved.component.css']
})
export class UnapprovedComponent implements OnInit {

  wordList:Word[];
  checkedUserList:any;
  isDisableBtn:boolean;
  isSelected:boolean;
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
    this.listWordComponent.deleteWord(id, this);
  }

  updateWordList(){
    this.listWordComponent.updateWordList(this);
  }
}