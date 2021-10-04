import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
import { UploadService } from  '../../../service/upload.service';
import { FormGroup } from '@angular/forms';
import{HttpClient} from '@angular/common/http';


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
    console.log( this.form.value.anh);
  }

  createWordUs(){
    const profileData = new FormData();
    profileData.append("tu_en", this.form.value.tu_en);
    profileData.append("nghia_en", this.form.value.nghia_en);
    profileData.append("tu_vi", this.form.value.tu_vi);
    profileData.append("nghia_vi", this.form.value.nghia_vi);
    profileData.append("tu_lienquan", this.form.value.tu_lienquan);
    profileData.append("user_name", this.userComponent.userName);
    profileData.append("status", "Chưa duyệt");
    profileData.append("anh", this.form.value.anh, this.form.value.anh.name);
    this.form.reset();
    this.imgData="/assets/image/image.png"
    this.clientService.createWord(profileData).subscribe((response: any)=>{
      console.log(response);
      this.appComponent.alertWithSuccess(response);
    })
  }
}
