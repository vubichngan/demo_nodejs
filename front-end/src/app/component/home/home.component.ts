import { Component, OnInit } from '@angular/core';
import { UploadService } from  '../../service/upload.service';
import { FormGroup,FormControl } from '@angular/forms';
import { Word } from 'src/app/model/word';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  form: FormGroup;
  imgData: string;
  word:Word;
  constructor(private fileUploadService: UploadService) { }

  ngOnInit(): void {
      this.form= new FormGroup({
          image: new FormControl(null),
      })
  }

  // On file Select
  onFileSelect(event: Event){
    const file=(event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    const allowedMimeTypes=["image/png","image/jpeg","image/jpg"];
    if(file && allowedMimeTypes.includes(file.type)){
      const reader = new FileReader();
      reader.onload=()=>{
        this.imgData=reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(){
      console.log(3435);
      this.form.reset();
      this.imgData=null;
  }

}
