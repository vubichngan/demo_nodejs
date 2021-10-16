import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { UserComponent } from '../../user.component';
import { ListWordComponent } from '../list-word.component';


@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  wordListFilter:any[];
  wordList:Word[];
  search='';
  p: number = 1;
  constructor(private clientService: ClientService,private userComponent: UserComponent,private listWordComponent: ListWordComponent) { }

  ngOnInit(): void {
    this.clientService.getWord().subscribe((response: any)=>{
      const wordListA= response.filter(s => s.id_user==this.userComponent.idUser);
      this.wordList= wordListA.filter(s => s.status==="Đã duyệt");
      this.wordList.forEach(function(element){element.isChecked=false;})
      this.wordListFilter=this.wordList;
      console.log(this.wordListFilter);
    })
  }

  onKey(event: any){
    this.listWordComponent.onKey(event,this);
  }
}
