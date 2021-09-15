import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private WebReqService: WebRequestService) { }

  createWord(word:any){
    return this.WebReqService.post('user/word/create',word);
  }

  updateWord(_id:String, word: any){
    return this.WebReqService.put('user/word/update/'+_id,word);
  }

  deleteWord(_id: String){
    return this.WebReqService.delete('user/word/delete/'+_id);
  }

  showWord(){
    return this.WebReqService.get('user/word');
  }

  showWordId(_id: String){
    return this.WebReqService.get('user/word/'+_id);
  }

  showWordStatus(status: any){
    return this.WebReqService.get('manage/word/status/'+status);
  }

  getWord_vi( word:any){
    return this.WebReqService.get('user/word/word_vi/'+word);
  }

  getWord_en( word:any){
    return this.WebReqService.get('user/word/word_en/'+word);
  }

  createUser(user:any){
    return this.WebReqService.post('admin/user/create',user);
  }

  updateUser(_id:String, user: any){
    return this.WebReqService.put('admin/user/update/'+_id,user);
  }

  showUser(){
    return this.WebReqService.get('admin/user');
  }

}
