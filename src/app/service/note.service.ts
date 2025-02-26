import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class NoteService  {

  constructor(private _HttpClient:HttpClient,private _Router:Router) { }
 headers:any={
  token:'3b8ny__'+localStorage.getItem('_token')
 }
  addNote(data :object):Observable <any>
  {
    return this._HttpClient.post('https://note-sigma-black.vercel.app/api/v1/notes/',data,{headers:this.headers})
  }
gitNote():Observable<any>
{
  return this._HttpClient.get('https://note-sigma-black.vercel.app/api/v1/notes/',{headers:this.headers})
}
editNotes(id:string,data:object):Observable<any>{
  return this._HttpClient.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,data,{headers:this.headers})
}
deleteNote(id:string):Observable<any>{
  return this._HttpClient.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{headers:this.headers})
}
}

