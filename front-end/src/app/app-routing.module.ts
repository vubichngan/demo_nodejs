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

const routes: Routes = [
  {path:'', redirectTo: '/search', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'search', component: SearchComponent},
  //{path:'search/:type/:word', component: SearchComponent},
  {path:'admin', component: AdminComponent},
  {path:'manage', component: ManageComponent},
  {path:'user', component: UserComponent, canActivate: [AuthGuard], children:[
    {path:'new-word', component: NewWordComponent},
    {path:'edit-word', component: EditWordComponent},
    {path:'list-word', component: ListWordComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
