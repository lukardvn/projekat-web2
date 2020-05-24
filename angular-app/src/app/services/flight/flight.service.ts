import { Flight } from './../../../models/Flight';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  public departingFlights: Flight[];
  public returningFlights: Flight[];

  public departId: number = 0;
  public returnId: number = 0;

  private baseUrl = "https://localhost:44383";
  private flightRoute = "/Flights";
  private headers = { 'content-type': 'application/json' };

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.flightRoute}/GetAll`);
  }
  
  getFiltered(filter: any): Observable<any> {
    const body = JSON.stringify(filter);
    return this.http.post(`${this.baseUrl}${this.flightRoute}/GetFiltered`, body, {'headers': this.headers});
  }
}
