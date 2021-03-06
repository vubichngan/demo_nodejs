import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { UserComponent } from '../user.component';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  
  wordList:Word[];
  word:any[];
  w:Word[];
  count_approved;
  count_unapproved;
  count_not_approved;
  constructor(private clientService: ClientService,private userComponent: UserComponent) { }

  ngOnInit(): void {
    this.clientService.getWordL().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.id_user==this.userComponent.idUser);
      this.w= this.wordList.filter(s => s.status==="Đã duyệt");
      this.count_approved=this.w.length;
      this.w= this.wordList.filter(s => s.status==="Từ chối");
      this.count_unapproved=this.w.length;
      this.word= this.wordList.filter(s => s.status==="Chưa duyệt"||s.status==="Duyệt lại");
      this.count_not_approved=this.word.length;
      this.word.sort((a, b) => {
        return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
      });
    })
  }

   
}
