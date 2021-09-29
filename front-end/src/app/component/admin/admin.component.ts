import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { User } from 'src/app/model/user';
import { AppComponent } from 'src/app/app.component';
import { NgForm} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userList:User[];
  user_name:String;
  password: String;
  checkedUserList:any;
  isSelected:boolean;
  status:String;
  isDisableBtn:boolean;
  serverErrorMessage:string;
  userDetails;
  userId
  constructor(private clientService: ClientService, private appComponent:AppComponent,private router: Router) { 
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

  onLogout(){
    this.appComponent.onLogout(this);
  }

  formCreateUser(){
  Swal.fire({
    title: 'Thêm quản lý',
    html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
    <input type="password" id="password" class="swal2-input" placeholder="Password">`,
    confirmButtonText: 'Save',
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector('#login').value
      const password = Swal.getPopup().querySelector('#password').value
      const le=password.length
      if (!login || !password) {
        Swal.showValidationMessage(`Please enter username and password`)
      }else if(le<4){
        Swal.showValidationMessage(`Please enter password atleast 4 characters`)
      }
      return { login: login, password: password }
    }
  }).then((result) => {
    this.createUser(result);
  })
}

createUser(form){
  var user=new User();
    user.user_name=form.value.login;
    user.password= form.value.password;
    user.permission= "1";
    user.status="Kích hoạt";
  this.clientService.createUser(user).subscribe((response: any)=>{
    this.reset();
    console.log(response);
    this.appComponent.alertWithSuccess("Successfully");
  },
  err=>{
    if(err.status===422){
      this.appComponent.erroAlert(err.error.join('</br>'));
    }else{
      this.appComponent.erroAlert('Something went wrong. Please contact admin');
    }
  })
}

deleteUser(id:any){
  this.clientService.deleteUser(id).subscribe((response: any)=>{
    this.reset();
    this.appComponent.alertWithSuccess(response);
  },err=>{
    this.appComponent.erroAlert('Delete error: '+err);
  }
  )
}
  reset(){
    this.clientService.getUser().subscribe((response: any)=>{
      this.userList=response;
      this.userList.forEach(function(element){
        element.isChecked=false;
        if(element.permission==='0'){
          element.permission="Quản trị hệ thống";
        }else if(element.permission==='1')
                element.permission="Quản lý";
        else element.permission="Người dùng thường";
      })
      this.status="Kich hoat";
      this.isSelected=false;
      this.isDisableBtn=true;
    })
  }
  

  updateUser(id: any,status: String){
    var user=new User();
    user.status=status;
    this.clientService.updateUser(id,user).subscribe((response: any)=>{
      console.log(response);
    })
    this.reset();
  }

  updateUserList(){
    for(var i=0;i<this.checkedUserList.length;i++){
      this.updateUser(this.checkedUserList[i]._id,this.status);
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.userList.length; i++) {
      this.userList[i].isChecked = this.isSelected;
    }
    this.getCheckedItemList();
  }
   
  isAllSelected() {
    this.isSelected = this.userList.every(function(item:any) {
        return item.isChecked == true;
      })
    this.getCheckedItemList();
  }
  
  getCheckedItemList(){
    this.checkedUserList = [];
    for (var i = 0; i < this.userList.length; i++) {
      if(this.userList[i].isChecked)
      this.checkedUserList.push(this.userList[i]);
    }
    if(this.checkedUserList.length>0){
      this.isDisableBtn=false;
    }else{
      this.isDisableBtn=true;
    }
  }
}
