import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
import { UploadService } from  '../../../service/upload.service';
import{HttpClient} from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';



@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {

  form:FormGroup;
  imgData: string;
  constructor(private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent,
    private fileUploadService: UploadService,private http:HttpClient) { }

  ngOnInit(): void {
    this.userComponent.newForm(this);
    this.imgData="/assets/image/image.png"
  }
  
  onFileSelect(event: Event){
    this.userComponent.onFileSelect(event,this);
  }

  reset(){
    this.form= new FormGroup({
      tu_en: new FormControl(" "),
      nghia_en: new FormControl(" "),
      tu_vi: new FormControl(" "),
      nghia_vi: new FormControl(" "),
      tu_lienquan: new FormControl(" "),
      anh: new FormControl(null),
    })
    this.imgData="/assets/image/image.png"
  }

  createWordUs(){
    var words={
      tu_en: this.form.value.tu_en,
      nghia_en:this.form.value.nghia_en,
      tu_vi:this.form.value.tu_vi,
      nghia_vi:this.form.value.nghia_vi,
      tu_lienquan:this.form.value.tu_lienquan,
      user_name: this.userComponent.userName,
      status:"Chưa duyệt",
    };
    this.clientService.createWord(words).subscribe((response: any)=>{
      const idWord=response._id;
      if(this.form.value.anh!=null){
        const profileData = new FormData();
        profileData.append("_id", idWord);
        profileData.append("anh", this.form.value.anh, this.form.value.anh.name);
        this.clientService.updateImg(idWord,profileData).subscribe((response: any)=>{
          this.appComponent.alertWithSuccess("Create Successfully");
        })
      }else {
        this.appComponent.alertWithSuccess(response);
      }
      this.reset();
    },
    err=>{
      this.appComponent.erroAlert('Update error: '+err);
    })
    
   
    // profileData.append("tu_en", this.form.value.tu_en);
    // profileData.append("nghia_en", this.form.value.nghia_en);
    // profileData.append("tu_vi", this.form.value.tu_vi);
    // profileData.append("nghia_vi", this.form.value.nghia_vi);
    // profileData.append("tu_lienquan", this.form.value.tu_lienquan);
    // profileData.append("user_name", this.userComponent.userName);
    // profileData.append("status", "Chưa duyệt");
    // profileData.append("anh", this.form.value.anh, this.form.value.anh.name);
    
    // this.clientService.createWord(profileData).subscribe((response: any)=>{
    //   this.appComponent.alertWithSuccess(response);
    // })
  }
}
