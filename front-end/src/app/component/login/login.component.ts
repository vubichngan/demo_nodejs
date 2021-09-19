import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { User } from 'src/app/model/user';
import { ClientService } from 'src/app/service/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  serverErrorMessage:string;
  user_name:String;
  Password:string;
  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    this.clientService.loginUser(form.value).subscribe(
      res=>{
        this.clientService.setToken(res['token']);
        this.router.navigateByUrl('/user');
      },
      err=>{
        this.serverErrorMessage=err.error.message;
      }
    )
  }
}
