import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  clientService:ClientService;
  router: Router;

  alertWithSuccess(title){
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2000,
    }) ;
  }

  erroAlert(title){  
    Swal.fire({  
      icon: 'error',  
      title:title, 
      showConfirmButton: true,
    })  
  } 
  
  onLogout(nameComponent){
    nameComponent.clientService.deleteToken();
    nameComponent.router.navigate(['/login']);
  }

}
