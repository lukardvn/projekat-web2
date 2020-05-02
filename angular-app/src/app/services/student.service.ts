import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  baseUrl = "https://localhost:44383";
  apiRoute = "/api/Students";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    console.log("ovde udje, sve ok");
    return this.http.get<any>(`${this.baseUrl}${this.apiRoute}`);
  }
}
