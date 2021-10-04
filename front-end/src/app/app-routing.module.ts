import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { AdminComponent } from './component/admin/admin.component';
import { HomeComponent } from './component/home/home.component'; 
import { LoginComponent } from './component/login/login.component';
import { ManageComponent } from './component/manage/manage.component';
import { RegisterComponent } from './component/register/register.component';
import { SearchComponent } from './component/search/search.component';
import { UserComponent } from './component/user/user.component';
import { NewWordComponent } from './component/user/new-word/new-word.component';
import { EditWordComponent } from './component/user/edit-word/edit-word.component';
import { ListWordComponent} from './component/user/list-word/list-word.component';
import { NotApprovedYetComponent } from './component/user/list-word/not-approved-yet/not-approved-yet.component';
import { ApprovedComponent } from './component/user/list-word/approved/approved.component';
import { UnapprovedComponent } from './component/user/list-word/unapproved/unapproved.component';
import { MApprovedComponent} from './component/manage/m-approved/m-approved.component';
import { NeetToBeApprovedComponent} from './component/manage/neet-to-be-approved/neet-to-be-approved.component';
import { ListUserComponent } from './component/admin/list-user/list-user.component';


const routes: Routes = [
  {path:'', redirectTo: '/search', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'search', component: SearchComponent},
  {path:'admin', component: AdminComponent, canActivate: [AuthGuard], children:[
    {path:'list-user', component: ListUserComponent},
    {path:'mapproved', component: MApprovedComponent},
    {path:'napproved', component: NeetToBeApprovedComponent},
  ]},
  {path:'manage', component: ManageComponent, canActivate: [AuthGuard], children:[
    {path:'mapproved', component: MApprovedComponent},
    {path:'napproved', component: NeetToBeApprovedComponent},
  ]},
  {path:'user', component: UserComponent, canActivate: [AuthGuard], children:[
    {path:'new-word', component: NewWordComponent},
    {path:'edit-word', component: EditWordComponent},
    {path:'list-word', component: ListWordComponent, canActivate: [AuthGuard], children:[
      {path:'notApprovedYet', component: NotApprovedYetComponent},
      {path:'approved', component: ApprovedComponent},
      {path:'unapproved', component: UnapprovedComponent},
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
