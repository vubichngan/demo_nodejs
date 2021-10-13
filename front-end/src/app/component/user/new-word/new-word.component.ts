import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
import{HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,Validators,FormArray} from '@angular/forms';



@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {

  form:FormGroup;
  imgData: string;
  constructor(private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent,
    private http:HttpClient,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reset();
  }
  
  onFileSelect(event: Event){
    this.userComponent.onFileSelect(event,this);
  }

  reset(){
    this.userComponent.newForm(this);
    this.imgData="/assets/image/image.png"
  }

  get tu_lienquan() : FormArray {
    return this.form.get("tu_lienquan") as FormArray
  }

  removeTu_lienquan(i){
    this.userComponent.removeTu_lienquan(i,this);
  }

  addTu_lienquan(event){
    if(event.key=="Tab"){
      this.userComponent.addTu_lienquan(this);
    }else this.userComponent.addTu_lienquan(this);
  }

  

  createWordUs(){
    var word =new Word();
    word=this.form.value;
    word.status="Chưa duyệt";
    word.id_user=this.userComponent.idUser;
    if(this.form.value.anh!=null){
      const profileData = new FormData();
      profileData.append("anh", this.form.value.anh, this.form.value.anh.name);
      this.clientService.createImg(profileData).subscribe((response: any)=>{
        word._id=response._id;
        this.clientService.updateWord(response._id,word).subscribe((response: any)=>{
          this.appComponent.alertWithSuccess(response);
        },
        err=>{
          this.appComponent.erroAlert('Update error: '+err);
        })
      })
    }else {
        this.clientService.createWord(word).subscribe((response: any)=>{
          this.appComponent.alertWithSuccess(response);
          console.log(response);})
      }
  }
}
