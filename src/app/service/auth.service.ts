import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _Router:Router ) {
    if(localStorage.getItem('_token')!=null)
    {
      this.decodeToken();
    }
   }
   BathUrl :String='https://note-sigma-black.vercel.app/api/v1/users/';
  signUp(data:object):Observable<any>{
    return this._HttpClient.post(this.BathUrl+'signUp',data);
  }
  login(data:object):Observable<any>
  {
    return this._HttpClient.post(this.BathUrl+'signIn',data);
  }
  //user info from token
  userInfo= new BehaviorSubject(null);
  decodeToken(){
    let encode=JSON.stringify(localStorage.getItem('_token'));
    let decode:any=jwtDecode(encode);
   this.userInfo.next(decode);


  }
  logOut(){
    this.userInfo.next(null);
    localStorage.removeItem('_token');
    this._Router.navigate(['/login'])
  }
}
