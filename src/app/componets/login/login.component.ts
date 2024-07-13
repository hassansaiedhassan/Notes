import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private _AuthService:AuthService,private _Router:Router){}
loginForm:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]) ,
  password:new FormControl(null,[Validators.required])
})
status:boolean=false;
abiError:string='';
handleLogin(loginForm:FormGroup)
{
  this.status=true;
this._AuthService.login(loginForm.value).subscribe({
  next:(resp)=>{
    this.status=false;
    localStorage.setItem('_token',resp.token)
    this._AuthService.decodeToken();
    this._Router.navigate(['/home']);

  },
  error:(res)=>
  {
    this.abiError=res.error.msg;
    this.status=false;

  }
})
}
}
