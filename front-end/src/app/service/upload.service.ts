import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { map } from  'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL: string = "https://file.io/";  
    constructor(private httpClient: HttpClient) { }
  //   public upload(formData) {

  //     return this.httpClient.post<any>(this.SERVER_URL, formData, {  
  //        reportProgress: true,  
  //        observe: 'events'  
  //     });  
  //  }

  // Returns an observable
    upload(file):Observable<any> {
    
      // Create form data
      const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("file", file, file.name);
        
      // Make http post request over api
      // with formData as req
      return this.httpClient.post(this.SERVER_URL, formData)
    }
}
