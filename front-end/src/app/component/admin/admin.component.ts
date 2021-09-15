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
  constructor(private clientService: ClientService) { 
  }

  ngOnInit(): void {
    this.clientService.showUser().subscribe((response: any)=>{
      this.userList=response;
      this.userList.forEach(function(element){element.isChecked=false;})
      console.log(response);
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
      console.log(response);
    })
    this.ngOnInit();
    form.resetForm();
  }

  updateUser(id: any,status: String){
    var user=new User();
    user.status=status;
    this.clientService.updateUser(id,user).subscribe((response: any)=>{
      console.log(response);
    })
    this.ngOnInit();
  }

  updateUserList(){
    for(var i=0;i<this.checkedUserList.length;i++){
      this.updateUser(this.checkedUserList[i]._id,this.status);
      console.log(this.checkedUserList[i]._id);
    }
    console.log(this.status);
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
