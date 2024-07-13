import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componets/home/home.component';
import { LoginComponent } from './componets/login/login.component';
import { RegisteComponent } from './componets/registe/registe.component';
import { NotFoundComponent } from './componets/not-found/not-found.component';
import { authGuard } from './service/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',canActivate:[authGuard],component:HomeComponent,title:'Home'},
  {path:'login',component:LoginComponent,title:'Login'},
  {path:'register',component:RegisteComponent,title:'Register'},
  {path:'**',component:NotFoundComponent,title:'Page not found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
