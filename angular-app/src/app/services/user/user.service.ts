import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/User';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "https://localhost:44383";
  userRoute = "/User";
  authRoute = "/Auth";
  headers = { 'content-type': 'application/json' }

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.userRoute}/GetAll`);
  }

  getSingle(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.userRoute}/${id}`);
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.userRoute}/profile/${id}`);
  }

  registerSingle(user: User) : Observable<any> {
    const body = JSON.stringify(user);
    return this.http.post(this.baseUrl + this.authRoute + "/Register", body, {'headers': this.headers });
  }

  updateSingle(user: User) {  //kod patcha se salju samo property koji treba da se modifikuju
    const body = JSON.stringify(user);
    return this.http.put<any>(`${this.baseUrl}${this.userRoute}`, body, {'headers': this.headers});
  }

  deleteSingle(id: number) {
    return this.http.delete<any>(`${this.baseUrl}${this.userRoute}/${id}`);
  }

  //PROBA: da li username vec postoji
  userExists(email: string) {
    return this.http.get(`${this.baseUrl}${this.authRoute}/AlreadyExists/${email}`);
  }

  /*samo admin moze da cita sve usere
  get() { //mislim da ovo nista ne treba, da httpClient radi sve to za nas uz pomoc interceptora
    let headers = new Headers();
    let token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    //return this.http.get<any>(`${this.baseUrl}${this.userRoute}/GetAll`, options);
  }*/
}
