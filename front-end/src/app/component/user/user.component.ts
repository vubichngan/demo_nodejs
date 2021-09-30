import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Word } from 'src/app/model/word';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { FormGroup,FormControl } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  
  
  // form: FormGroup;
  wordId;
  userDetails;
  userId;
  imgData:String;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = []; 
  constructor(private clientService: ClientService,private router: Router, private appComponent: AppComponent) {
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
    
  }
  newForm(form){
    form.form= new FormGroup({
      tu_en: new FormControl(null),
      nghia_en: new FormControl(null),
      tu_vi: new FormControl(null),
      nghia_vi: new FormControl(null),
      tu_lienquan: new FormControl(null),
      anh: new FormControl(null),
      status: new FormControl(null),
    })
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
