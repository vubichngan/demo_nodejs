import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { FormGroup,FormControl ,Validators} from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  
  
  // form: FormGroup;
  wordId;
  userName;
  idUser;
  imgData:String;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = []; 
  constructor(private clientService: ClientService,private router: Router, private appComponent: AppComponent) {
  }

  ngOnInit(): void {
    this.clientService.getUserProfile().subscribe(
      res=>{
        this.userName=res['user'].user_name;
      },
      err=>{
        console.log(err);
      });
      this.idUser=this.clientService.getUserPayload()._id
  }
  newForm(form){
    form.form= form.fb.group({
      tu: form.fb.group({
        tu_en:["",Validators.required],
        tu_loai:["(n)",Validators.required],
        phien_am:["",Validators.required],
      }),
      nghia_en:[""],
      nghia_vi:["",Validators.required],
      tu_lienquan: form.fb.array([]),
      anh: form.fb.control(null),
    })
  }

  removeTu_lienquan(i:number,form) {
    form.tu_lienquan.removeAt(i);
  }  

  addTu_lienquan(form){
    const t=form.fb.group({
      id_tu:["",Validators.required]
    })
    form.tu_lienquan.push(t);
  }
  
  onLogout(){
    this.appComponent.onLogout(this);
  }
  
  onFileSelect(event: Event,form){
    const file=(event.target as HTMLInputElement).files[0];
    form.form.patchValue({anh:file});
    const allowedMimeTypes=["image/png","image/jpeg","image/jpg"];
    if(file && allowedMimeTypes.includes(file.type)){
      const reader = new FileReader();
      reader.onload=()=>{
        form.imgData=reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  formChangePassword(){
    this.appComponent.formChangePassword(this,this.idUser,this.userName);
  }




}
