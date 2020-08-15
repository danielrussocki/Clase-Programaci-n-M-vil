import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { tap } from 'rxjs/operators';
import { Notas } from '../models/Notas';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  token: any;
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage
  ) {
    this.storage.getItem('token').then(
      data => {
        // console.log(data["token"])
        this.token = data["token"];
        this.headers = new HttpHeaders({
          'Authorization': this.token
        });
      }, err => {
        this.token = null;
      }
    ).catch(err => console.log(err))
  }

  getAllNotes(){
    return this.http.get<any>(`http://localhost:3000/api/notas`, {headers: this.headers})
      .pipe(
        tap(notes => {
          // console.log("notes", notes)
          return notes;
        })
      )
    // this.storage.getItem("token").then(
    //   (_token) => {
    //     console.log(_token["token"]);
    //   }
    // ).catch(err => console.log(err));
    // console.log(this.token);
  }

  createSimpleNote(obj: any){
    return this.http.post<any>(`http://localhost:3000/api/notas`, obj, {headers: this.headers})
      .pipe(
        tap(noteCreated => {
          return noteCreated
        })
      )
  }

  getDataSimpleNote(id: number){
    return this.http.get<any>(`http://localhost:3000/api/notas/${id}`, { headers: this.headers })
      .pipe(
        tap(simpleNote => {
          return simpleNote
        })
      )
  }

  editSimpleNote(obj: any){
    return this.http.put<any>(`http://localhost:3000/api/notas/${obj.id_nota}`, obj, { headers: this.headers })
      .pipe(
        tap(noteEdited => {
          return noteEdited
        })
      )
  }

  deleteSimpleNote(id: number){
    return this.http.delete<any>(`http://localhost:3000/api/notas/${id}`, { headers: this.headers })
      .pipe(
        tap(noteDeleted => {
          return noteDeleted
        })
      )
  }
}
