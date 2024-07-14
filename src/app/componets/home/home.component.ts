
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Data } from 'src/app/service/data';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes:Data[]= [];
  searchKey:string='';
  noteId:string='';
  flag:boolean=false;
   len:number=0;
constructor(private _NoteService:NoteService,private spinner:NgxSpinnerService)
{}
addNoteForm:FormGroup=new FormGroup({
  title: new FormControl(null),
  content: new FormControl(null)
})
noteEditForm:FormGroup=new FormGroup({
  title:new FormControl(null),
  content:new FormControl(null)
})
addNote(addNoteForm:FormGroup)
{
  console.log(addNoteForm.value);
  this.spinner.show();
  this._NoteService.addNote(addNoteForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.getNote();
      this.spinner.hide();
    },
    error:(err)=>{
      console.log(err);
    }

  })

}

getNote(){
this.spinner.show();
  this._NoteService.gitNote().subscribe({
  next:(res)=>{
    console.log(res);
    setTimeout(()=>{
      this.spinner.hide();
    },300)

    this.notes=res.notes;
    this.len=res.notes.length;
  }
  ,error:(err)=>
  {
    console.log(err);
    this.spinner.hide();
  }
})
}
getNoteId(id:string){
  this.noteId=id;
}
editNote(noteEditForm:FormGroup){
  this._NoteService.editNotes(this.noteId,noteEditForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.getNote();
    },
    error:(err)=>
    {console.log(err)}
  })
}
deleteNote(){
  this.spinner.show()
  this._NoteService.deleteNote(this.noteId).subscribe({
    next:(res)=>{

      this.getNote();
      setTimeout(()=>{
        this.spinner.hide();
      },500)
    },
    error:(err)=>
    {
      this.spinner.hide();
    }
  })
}
ngOnInit(): void {
this.getNote();

// console.log(this.notes)
}
}
