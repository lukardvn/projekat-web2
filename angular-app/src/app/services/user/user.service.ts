import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "https://localhost:44383";
  userRoute = "/User";
  authRoute = "/Auth";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.userRoute}/GetAll`);
  }

  getSingle(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.userRoute}/${id}`);
  }

  /*addSingle(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);
    
    return this.http.post(this.baseUrl + this.apiControllerRoute, body, {'headers': headers });
  }*/

  registerSingle(user: User) : Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);

    return this.http.post(this.baseUrl + this.authRoute + "/Register", body, {'headers': headers });
  }

  updateSingle(user: User) {  //kod patcha se salju samo property koji treba da se modifikuju
    const body = JSON.stringify(user);
    const headers = { 'content-type': 'application/json' }
    
    return this.http.put<any>(`${this.baseUrl}${this.userRoute}`, body, {'headers': headers});
  }

  deleteSingle(id: number) {
    return this.http.delete<any>(`${this.baseUrl}${this.userRoute}/${id}`);
  }

  //PROBA: da li username vec postoji
  userExists(email: string) {
    return this.http.get(`${this.baseUrl}${this.authRoute}/AlreadyExists/${email}`);
  }
}
