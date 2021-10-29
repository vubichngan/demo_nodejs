import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { ManageComponent } from '../manage.component';

@Component({
  selector: 'app-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {

  wordList:Word[];
  word:any[];
  w:Word[];
  count_approved;
  count_re_approved;
  count_not_approved;
  constructor(private clientService: ClientService,private manageComponent:ManageComponent) { }

  ngOnInit(): void {
    this.clientService.getWordL().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.id_manager==this.manageComponent.idUser);
      this.word= this.wordList.filter(s => s.status==="Đã duyệt");
      this.count_approved=this.word.length;
      this.w= response.filter(s => s.status==="Chưa duyệt");
      this.count_not_approved=this.w.length;
      this.w= this.wordList.filter(s => s.status==="Duyệt lại");
      this.count_re_approved=this.w.length;
      this.word.sort((a, b) => {
        return <any>new Date(b.updatedAt) - <any>new Date(a.updatedAt);
      });
    })
  }

}
