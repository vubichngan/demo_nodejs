import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { HomeComponent } from './component/home/home.component'; 
import { LoginComponent } from './component/login/login.component';
import { ManageComponent } from './component/manage/manage.component';
import { RegisterComponent } from './component/register/register.component';
import { SearchComponent } from './component/search/search.component';
import { UserComponent } from './component/user/user.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'search', component: SearchComponent},
  {path:'search/:type/:word', component: SearchComponent},
  {path:'admin', component: AdminComponent},
  {path:'manage', component: ManageComponent},
  {path:'user', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
