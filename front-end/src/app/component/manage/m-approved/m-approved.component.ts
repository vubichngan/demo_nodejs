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
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getWord().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.status==="Đã duyệt");
      this.wordList.forEach(function(element){element.isChecked=false;})
    })
  }

}
