import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';
import { HomeComponent } from '../home.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  wordList:Word[];
  wordListFilter:any[];
  wordSearch:String;
  search;
  isHide:boolean;
  p: number = 1;
  constructor(private clientService: ClientService,private homeComponent: HomeComponent) { }

  ngOnInit(): void {
    this.clientService.getWord().subscribe((response: any)=>{
      this.wordList=response;
      this.wordList= this.wordList.filter(s => s.status==="Đã duyệt");
      this.wordListFilter=this.wordList;
      this.wordListFilter.sort((a, b) => {
        return <any>new Date(a.tu.tu_en) - <any>new Date(b.tu.tu_en);
      });
    })
    this.wordSearch="";
  }

  getWordId(id){
    this.homeComponent.getWordId(id);
  }

  searchWord(text:any){
    this.homeComponent.searchWord(text);
  }

    onKey(event){
      this.search = event.target.value;
      if(this.search===""){
        this.wordListFilter=this.wordList;
      }else{
        this.wordListFilter= this.wordList.filter(s => s.tu.tu_en.toLowerCase().indexOf(this.search.toLowerCase())!==-1);
      }
    }
}
