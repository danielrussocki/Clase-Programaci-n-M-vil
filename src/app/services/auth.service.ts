import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage
  ) { }

  login(email: String, password: String){
    return this.http.post(`http://localhost:3000/api/auth/login`, {
      correo: email,
      password: password
    }).pipe(
      tap(token => {
        this.storage.setItem('token', token)
          .then(() => {
            console.log('token stored!');
          }, err => {
            console.error(err);
          });
          this.token = token;
          this.isLoggedIn = true;
          return token;
      })
    )
  }

  registerUser(data: any){
    return this.http.post(`http://localhost:3000/api/auth/register`, data)
      .pipe(
        tap(user => {
          console.log(user)
        })
      )
  }

  logout(){
    this.storage.remove('token');
    this.isLoggedIn = false;
    delete this.token;
  }

  getToken(){
    return this.storage.getItem('token').then(data => {
      this.token = data;
      if(this.token != null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }, err => {
      this.token = null;
      this.isLoggedIn = false;
    });
  }
}
