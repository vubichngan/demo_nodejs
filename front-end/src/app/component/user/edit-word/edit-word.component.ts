import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit {

  // wordId:String;
  // tu_en:String;
  // nghia_en:String;
  // tu_vi:String;
  // nghia_vi:String;
  // anh;
  // tu_lienquan:String;
  // status: String;
  form:FormGroup;
  imgData: string;
  constructor(private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent) { }

  ngOnInit(): void {
    this.userComponent.newForm(this);
    this.imgData="/assets/image/image.png"
  }

  onFileSelect(event: Event){
    this.userComponent.onFileSelect(event,this);
  }

  updateWord(id: any){
    var words={
      tu_en: this.form.value.tu_en,
      nghia_en:this.form.value.nghia_en,
      tu_vi:this.form.value.tu_vi,
      nghia_vi:this.form.value.nghia_vi,
      anh:this.form.value.anh,
      tu_lienquan:this.form.value.tu_lienquan,
    };
    this.imgData=null;
    this.form.reset();
    this.clientService.updateWord(id,words).subscribe((response: any)=>{
      // this.reset();
      this.appComponent.alertWithSuccess(response);
    },
    err=>{
      this.appComponent.erroAlert('Update error: '+err);
    })
  }
}
