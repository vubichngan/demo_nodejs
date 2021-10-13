import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';


@Component({
  selector: 'app-m-approved',
  templateUrl: './m-approved.component.html',
  styleUrls: ['./m-approved.component.css']
})
export class MApprovedComponent implements OnInit {

  wordList:Word[];
  wordListFilter:Word[];
  search='';
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getWord().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.status==="Đã duyệt");
      this.wordListFilter=this.wordList;
    })
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
