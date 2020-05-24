import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "https://localhost:44383";
  authRoute = "/Auth";
  headers = { 'content-type': 'application/json' }

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}${this.authRoute}/Login`, JSON.stringify(credentials), { 'headers': this.headers })
      .pipe(map(response => {
        let result = response as any;
        if (result && result.data){
          localStorage.setItem('token', result.data);
          return true;
        }
        return false;
      }));
  }

  logout() {  //samo obrisati token iz localStorage-a
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if (!token) return false;

    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    return new JwtHelperService().decodeToken(token);    
  }
}
