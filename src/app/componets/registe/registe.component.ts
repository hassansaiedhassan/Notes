import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './registe.component.html',
  styleUrls: ['./registe.component.css']
})
export class RegisteComponent {


  constructor(private _AuthService:AuthService, private _Router:Router){

  }

  status:boolean = false;
abiError:string='';
  // form declare
  signUp:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required , Validators.email]),
    password:new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]),
    age:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

  //handle signup
  handleSignup(signUp:FormGroup){
    this.status = true;
    this._AuthService.signUp(signUp.value).subscribe({
      next:(response)=>{
       if(response.msg == 'done'){
        this.status = false;
        this._Router.navigate(['/login']);
       }
        // console.log(response)
      },
      error:(err)=>{
        this.status = false;
        console.log(err)
        this.abiError=err.error.msg;
      }
    })
  }


}
