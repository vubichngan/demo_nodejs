import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { User } from 'src/app/model/user';
import { NgForm} from '@angular/forms';

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
  showSuccessMessage:boolean;
  serverErrorMessage:string;
  constructor(private clientService: ClientService) { 
  }

  ngOnInit(): void {
    this.reset();
  }

  reset(){
    this.clientService.showUser().subscribe((response: any)=>{
      this.userList=response;
      this.userList.forEach(function(element){element.isChecked=false;})
      this.status="Kich hoat";
      this.isSelected=false;
      this.isDisableBtn=true;
    })
  }
  createUser(form:NgForm){
    var user={
      user_name:this.user_name,
      password: this.password,
      permission: "Quan ly",
      status:"Kich hoat",
    };
    this.clientService.createUser(user).subscribe((response: any)=>{
      this.showSuccessMessage=true;
      setTimeout(()=>this.showSuccessMessage=false,4000);
      this.serverErrorMessage='';
    },
    err=>{
      if(err.status===422){
        this.serverErrorMessage=err.error.join('</br>');
      }else{
        this.serverErrorMessage='Something went wrong. Please contact admin';
      }
    })
    this.reset();
    form.resetForm();
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
