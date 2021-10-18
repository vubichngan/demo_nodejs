import { Component, OnInit } from '@angular/core';
import { UploadService } from  '../../service/upload.service';
import { FormGroup,FormControl } from '@angular/forms';
import { Word } from 'src/app/model/word';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  id;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  getWordId(id){
    this.id=id;
  }

  searchWord(text:any){
    if(text!==""){
      var word=new Word();
      this.clientService.getWordL().subscribe((response: any)=>{
        word= response.filter(s => s.tu.tu_en.toLowerCase().indexOf(text.toLowerCase())!==-1);
        this.id=word[0]._id;
      })
    }
    
  }
}
