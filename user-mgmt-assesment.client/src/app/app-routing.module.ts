import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserGridComponent } from './pages/user-grid/user-grid.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {title: 'create user', component: UserFormComponent, path:'user/create'},
  {title: 'view all users', component: UserGridComponent, path:'user/view-all'},
  {title: 'login', component: LoginComponent, path:'login'},
  {title: 'login', component: LoginComponent, path:'**'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
