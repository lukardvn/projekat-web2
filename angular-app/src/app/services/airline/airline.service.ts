import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  baseUrl = "https://localhost:44383/Airline";

  constructor(private http: HttpClient) { }

  getMine(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/MyAirline`);
  }
}
