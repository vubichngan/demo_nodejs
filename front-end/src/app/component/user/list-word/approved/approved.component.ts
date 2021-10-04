import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { UserComponent } from '../../user.component';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  wordList:Word[];
  constructor(private clientService: ClientService,private userComponent: UserComponent) { }

  ngOnInit(): void {
    this.clientService.getWord().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.user_name==this.userComponent.userName);
      this.wordList= response.filter(s => s.status==="Đã duyệt");
      this.wordList.forEach(function(element){element.isChecked=false;})
    })
  }
}
