import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private WebReqService: WebRequestService) { }

  createWord(word:any){
    return this.WebReqService.post('word/create',word);
  }

  updateWord(_id:String, word: any){
    return this.WebReqService.put('word/update/'+_id,word);
  }

  deleteWord(_id: String){
    return this.WebReqService.delete('word/delete/'+_id);
  }

  showWord(){
    return this.WebReqService.get('word');
  }

  showWordId(_id: String){
    return this.WebReqService.get('word/'+_id);
  }

  showWordStatus(status: any){
    return this.WebReqService.get('word/status/'+status);
  }

  getWord_vi( word:any){
    return this.WebReqService.get('word/word_vi/'+word);
  }

  getWord_en( word:any){
    return this.WebReqService.get('word/word_en/'+word);
  }

  createUser(user:any){
    return this.WebReqService.post('user/create',user);
  }

  loginUser(authCredentials){
    return this.WebReqService.post('user/authenticate',authCredentials);
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }

  updateUser(_id:String, user: any){
    return this.WebReqService.put('user/update/'+_id,user);
  }

  showUser(){
    return this.WebReqService.get('user');
  }

}
