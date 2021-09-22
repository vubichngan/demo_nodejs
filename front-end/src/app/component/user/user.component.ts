import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { UploadService } from  '../../service/upload.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  wordList:Word[];
  wordId:String;
  tu_en:String;
  nghia_en:String;
  tu_vi:String;
  nghia_vi:String;
  anh:String;
  tu_lienquan:String;
  status: String;
  checkedUserList:any;
  isDisableBtn:boolean;
  isSelected:boolean;
  userDetails;
  userId;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = []; 
  constructor(private clientService: ClientService,private router: Router, private uploadService: UploadService) {
  }

  ngOnInit(): void {
    
    this.clientService.getUserProfile().subscribe(
      res=>{
        this.userDetails=res['user'].user_name;
      },
      err=>{
        console.log(err);
      });
    this.userId= this.clientService.getUserPayload()._id;
    this.reset();
  }

  alertWithSuccess(title){
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2000,
    }) ;
  }
  erroAlert(title)  
  {  
    Swal.fire({  
      icon: 'error',  
      title:title, 
    })  
  }  
  reset(){
    this.clientService.showWord().subscribe((response: any)=>{
      this.wordList= response.filter(s => s.id_user==this.userId);
      this.wordList.forEach(function(element){element.isChecked=false;})
      console.log(this.wordList);
      this.isDisableBtn=true;
      this.isSelected=false;
    })
  }

  onLogout(){
    this.clientService.deleteToken();
    this.router.navigate(['/login']);
  }

  getWordId(id: String){
    var word= new Word();
    this.clientService.showWordId(id).subscribe((response: any)=>{
      console.log(response);
      word=response;
      this.tu_en=word[0].tu_en;
      this.tu_vi=word[0].tu_vi;
      this.nghia_en=word[0].nghia_en;
      this.nghia_vi=word[0].nghia_vi;
      //this.anh=word[0].anh;
      this.tu_lienquan=word[0].tu_lienquan;
      this.status=word[0].status;
      this.wordId=word[0]._id;
      console.log(word[0].tu_en);
    })
  }

  createWordUs(form:NgForm){
    var words={
      tu_en: this.tu_en,
      nghia_en:this.nghia_en,
      tu_vi:this.tu_vi,
      nghia_vi:this.nghia_vi,
      anh:this.anh,
      tu_lienquan:this.tu_lienquan,
      status:"chua duyet",
      id_user:this.userId,
    };
    form.resetForm();
    this.clientService.createWord(words).subscribe((response: any)=>{
      this.reset();
      this.alertWithSuccess(response);
    })
  }

  
  updateWord(id: any,form: NgForm){
    var words={
      tu_en: this.tu_en,
      nghia_en:this.nghia_en,
      tu_vi:this.tu_vi,
      nghia_vi:this.nghia_vi,
      anh:this.anh,
      tu_lienquan:this.tu_lienquan
    };
    form.resetForm();
    this.clientService.updateWord(id,words).subscribe((response: any)=>{
      this.alertWithSuccess(response);
      this.reset();
    },
    err=>{
      this.erroAlert('Update error: '+err);
    })
  }

  deleteWord(id:any){
    this.clientService.deleteWord(id).subscribe((response: any)=>{
      this.reset();
      this.alertWithSuccess(response);
    },err=>{
      this.erroAlert('Delete error: '+err);
    }
    )
  }

  updateWordList(){
    for(var i=0;i<this.checkedUserList.length;i++){
      this.deleteWord(this.checkedUserList[i]._id);
      console.log(this.checkedUserList[i]._id);
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.wordList.length; i++) {
      this.wordList[i].isChecked = this.isSelected;
    }
    this.getCheckedItemList();
  }
   
  isAllSelected() {
    this.isSelected = this.wordList.every(function(item:any) {
        return item.isChecked == true;
      })
    this.getCheckedItemList();
  }
  
  getCheckedItemList(){
    this.checkedUserList = [];
    for (var i = 0; i < this.wordList.length; i++) {
      if(this.wordList[i].isChecked)
      this.checkedUserList.push(this.wordList[i]);
    }
    if(this.checkedUserList.length>0){
      this.isDisableBtn=false;
    }else{
      this.isDisableBtn=true;
    }
  }

//   uploadFile(file) {  
//     const formData = new FormData();  
//     formData.append('file', file.data);  
//     file.inProgress = true;  
//     this.uploadService.upload(formData).pipe(  
//       map(event => {  
//         switch (event.type) {  
//           case HttpEventType.UploadProgress:  
//             file.progress = Math.round(event.loaded * 100 / event.total);  
//             break;  
//           case HttpEventType.Response:  
//             return event;  
//         }
//         return "err";  
//       }),  
//       catchError((error: HttpErrorResponse) => {  
//         file.inProgress = false;  
//         return of(`${file.data.name} upload failed.`);  
//       })).subscribe((event: any) => {  
//         if (typeof (event) === 'object') {  
//           console.log(event.body);  
//         }  
//       });  
//   }

//   private uploadFiles() {  
//     this.fileUpload.nativeElement.value = '';  
//     this.files.forEach(file => {  
//       this.uploadFile(file);  
//     });  
// }

//   onClick() {  
//     const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
//     for (let index = 0; index < fileUpload.files.length; index++)  
//     {  
//      const file = fileUpload.files[index];  
//      this.files.push({ data: file, inProgress: false, progress: 0});  
//     }  
//       this.uploadFiles();  
//     };  
//     fileUpload.click();  
//   }


}
