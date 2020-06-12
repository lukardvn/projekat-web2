import { ReservationDto } from './../../../models/ReservationDto';
import { Flight } from 'src/models/Flight';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = "https://localhost:44383/Reservations";
  headers = { 'content-type': 'application/json' }

  public selectedDepartingFlight: Flight = null;
  public selectedReturningFlight: Flight = null;

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetAll`);
  }

  addReservation(reservation: ReservationDto): Observable<any> {
    const body = JSON.stringify(reservation);
    return this.http.post(`${this.baseUrl}/AddReservation`, body, { 'headers': this.headers });
  }

  getSingle(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  cancelReservation(reservationId: number) {
    return this.http.delete(`${this.baseUrl}/CancelReservation/${reservationId}`);
  }

}
