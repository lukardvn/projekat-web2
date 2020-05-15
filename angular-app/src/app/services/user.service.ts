import { HttpClient } from '@angular/common/http';
import { Injectable, ɵConsole } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "https://localhost:44383";
  apiControllerRoute = "/User";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.apiControllerRoute}/GetAll`);
  }

  getSingle(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.apiControllerRoute}/${id}`);
  }

  addSingle(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' }

    const body = JSON.stringify(user);
    //console.log("JSON: " + body);
    
    return this.http.post(this.baseUrl + this.apiControllerRoute, body, {'headers': headers });
  }
}
