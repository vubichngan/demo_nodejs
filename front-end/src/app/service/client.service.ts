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
}
