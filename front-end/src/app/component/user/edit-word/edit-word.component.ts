import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { AppComponent } from 'src/app/app.component';
import { UserComponent } from '../user.component';
import { FormGroup, FormControl,FormBuilder,Validators,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';


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
  comment;
  wordList:Word[];
  wordListFilter:any[];
  constructor(private router: Router,private fb: FormBuilder,private clientService: ClientService,private appComponent: AppComponent,private userComponent: UserComponent) { }

  ngOnInit(): void {
    this.userComponent.newForm(this);
    this.setWord();
    this.id=this.userComponent.wordId;
  }

  get(){
    this.clientService.getWordL().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.id_user==this.userComponent.idUser);
      this.wordList= this.wordList.filter(s => s.status!=="Từ chối");
      this.wordList= this.wordList.filter(s => s._id!==this.id);
      this.wordListFilter=this.wordList;
    })
  }

  onFileSelect(event: Event){
    this.userComponent.onFileSelect(event,this);
  }

  get tu_lienquan() : FormArray {
    return this.form.get("tu_lienquan") as FormArray
  }
  get tu(): any {
    return this.form.get('tu');
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
      this.comment=word[0].comment;
      if(word[0].anh==null){
        this.imgData="/assets/image/image.png";
      }else this.imgData=word[0].anh;
      this.img=word[0].anh;
      
      this.form= this.fb.group({
        tu: this.fb.group({
          tu_en:[word[0].tu.tu_en,Validators.required],
          tu_loai:[word[0].tu.tu_loai,Validators.required],
          phien_am:[word[0].tu.phien_am,Validators.required],
        }),
        nghia_en:[word[0].nghia_en],
        nghia_vi:[word[0].nghia_vi,Validators.required],
        tu_lienquan: this.fb.array([]),
        anh: [word[0].anh],
        status:[word[0].status],
      }) 
      for(var i=0; i<word[0].tu_lienquan.length;i++){
        const t=this.fb.group({
          id_tu:[word[0].tu_lienquan[i].id_tu,Validators.required],
        })
        this.tu_lienquan.push(t);
      }
      this.get();
    })
  }

async  updateWord(){
  var words =new Word();
    var t: Array<any> = []; 
    var w:any[];
    words=this.form.value;
    words.tu_lienquan.forEach(element=>{
      w=this.wordListFilter.filter(s => s.id.toString()===element.id_tu.toString())
      if(w.length==0){
        t.push(element.id_tu);
      }
    })
    if(t.length!=0){
        Swal.fire({
          title:'Thêm không thành công',
          icon: 'error',
          text:'Từ '+t+' chưa được tạo hãy thêm từ '+ t +' vào danh sách của bạn.'
        })
    }else{
      var profileData = new FormData();
      if(this.form.value.anh!=this.img){
        profileData.append("_id", this.id);
        profileData.append("anh", this.form.value.anh, this.form.value.anh.name);
      var p= await this.clientService.updateImg(this.id,profileData).toPromise();
      this.appComponent.alertWithSuccess(t);
      }
      words._id=this.id;
      if(words.status=="Từ chối"){
        words.status="Duyệt lại";
      }
      var v= await this.clientService.updateWord(this.id,words).toPromise();
      this.appComponent.alertWithSuccess(v);
      this.router.navigateByUrl('/user/list-word/notApprovedYet');
    }
    
  }
}
