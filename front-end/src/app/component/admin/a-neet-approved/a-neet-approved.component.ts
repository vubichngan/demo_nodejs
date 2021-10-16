import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AdminComponent } from '../admin.component';


@Component({
  selector: 'app-a-neet-approved',
  templateUrl: './a-neet-approved.component.html',
  styleUrls: ['./a-neet-approved.component.css']
})
export class ANeetApprovedComponent implements OnInit {

  search='';
  wordList:Word[];
  p: number = 1;
  wordListFilter:any[];
  constructor(private clientService: ClientService, private adminComponent:AdminComponent) { }

  ngOnInit(): void {
    this.clientService.getWordL().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.status=='Chưa duyệt');
      this.wordListFilter=this.wordList;
    })
  }

  onKey(event: any){
    this.adminComponent.onKey(event,this);
    if(this.search===""){
      this.wordListFilter=this.wordList;
    }else{
      this.wordListFilter= this.wordList.filter(s => s.tu.tu_en.toLowerCase().indexOf(this.search.toLowerCase())!==-1);
    }
  }

}
