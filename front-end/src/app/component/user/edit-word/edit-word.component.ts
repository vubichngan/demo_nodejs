import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
import { FormGroup, FormControl} from '@angular/forms';



@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit {

  form:FormGroup;
  imgData: string;
  id;
  constructor(private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent) { }

  ngOnInit(): void {
    this.userComponent.newForm(this);
    this.setWord();
    this.id=this.userComponent.wordId;
  }

  onFileSelect(event: Event){
    this.userComponent.onFileSelect(event,this);
  }

  setWord(){
    var word= new Word();
    this.clientService.getWord().subscribe((response: any)=>{
      word= response.filter(s => s._id==this.id);
      this.imgData=word[0].anh;
      this.form= new FormGroup({
        tu_en: new FormControl(word[0].tu_en),
        nghia_en: new FormControl(word[0].nghia_en),
        tu_vi: new FormControl(word[0].tu_vi),
        nghia_vi: new FormControl(word[0].nghia_vi),
        tu_lienquan: new FormControl(word[0].tu_lienquan),
        anh: new FormControl(null),
      })
    })
  }

  updateWord(){
    const profileData = new FormData();
    if(this.form.value.anh!=null){
      profileData.append("_id", this.id);
      profileData.append("anh", this.form.value.anh, this.form.value.anh.name);
      this.clientService.updateImg(this.id,profileData).subscribe((response: any)=>{
        console.log(response);
        this.appComponent.alertWithSuccess(response);
      })
    }
    var words={
      _id:this.id,
      tu_en: this.form.value.tu_en,
      nghia_en:this.form.value.nghia_en,
      tu_vi:this.form.value.tu_vi,
      nghia_vi:this.form.value.nghia_vi,
      tu_lienquan:this.form.value.tu_lienquan,
    };
    console.log(words);
    console.log(this.id);
    this.clientService.updateWord(this.id,words).subscribe((response: any)=>{
      console.log(response);
      this.appComponent.alertWithSuccess(response);
    },
    err=>{
      this.appComponent.erroAlert('Update error: '+err);
    })
  }
}
