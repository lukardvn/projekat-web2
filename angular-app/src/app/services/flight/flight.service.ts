import { Flight } from './../../../models/Flight';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  baseUrl = "https://localhost:44383";
  flightRoute = "/Flights";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.flightRoute}/GetAll`);
  }
  
  getFiltered(filter: any): Observable<any> {
    const body = JSON.stringify(filter);
    console.log(body);
    const headers = { 'content-type': 'application/json' }
    return this.http.post(`${this.baseUrl}${this.flightRoute}/GetFiltered`, body, {'headers': headers});
  }

}
