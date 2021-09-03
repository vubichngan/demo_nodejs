import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private WebReqService: WebRequestService) { }

  createWord(word:any){
    return this.WebReqService.post('user/create',word);
  }

  deleteWord(_id: String){
    return this.WebReqService.delete('user/delete/'+_id);
  }

  showWord(){
    return this.WebReqService.get('user');
  }
}
