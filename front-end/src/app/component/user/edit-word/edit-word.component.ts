import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
import { FormGroup, FormControl,FormBuilder,Validators,FormArray} from '@angular/forms';



@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit {

  form:FormGroup;
  imgData: string;
  id;
  img;
  constructor(private fb: FormBuilder,private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent) { }

  ngOnInit(): void {
    this.userComponent.newForm(this);
    this.setWord();
    this.id=this.userComponent.wordId;
  }

  onFileSelect(event: Event){
    this.userComponent.onFileSelect(event,this);
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

  setWord(){
    var word= new Word();
    this.clientService.getWord().subscribe((response: any)=>{
      word= response.filter(s => s._id==this.id);
      this.imgData=word[0].anh;
      this.img=word[0].anh;
      
      this.form= this.fb.group({
        tu: this.fb.group({
          tu_en:[word[0].tu.tu_en,Validators.required],
          tu_loai:[word[0].tu.tu_loai,Validators.required],
          phien_am:[word[0].tu.phien_am,Validators.required],
        }),
        nghia_en:[word[0].nghia_en,Validators.required],
        nghia_vi:[word[0].nghia_vi,Validators.required],
        tu_lienquan: this.fb.array([]),
        anh: [word[0].anh],
      }) 
      for(var i=0; i<word[0].tu_lienquan.length;i++){
        const t=this.fb.group({
          id_tu:[word[0].tu_lienquan[i].id_tu,Validators.required],
        })
        this.tu_lienquan.push(t);
      }
    })
  }

async  updateWord(){
    var profileData = new FormData();
    if(this.form.value.anh!=this.img){
      profileData.append("_id", this.id);
      profileData.append("anh", this.form.value.anh, this.form.value.anh.name);
     var t= await this.clientService.updateImg(this.id,profileData).toPromise();
     this.appComponent.alertWithSuccess(t);
     console.log(t);
    }
    var words=new Word();
    words=this.form.value;
    words._id=this.id;
     this.clientService.updateWord(this.id,words).subscribe((response: any)=>{
      this.appComponent.alertWithSuccess(response);
      console.log(response);
    },
    err=>{
      this.appComponent.erroAlert('Update error: '+err);
    })
  }
}
