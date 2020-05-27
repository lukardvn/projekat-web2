import { ReservationService } from './../../services/reservation/reservation.service';
import { FlightService } from './../../services/flight/flight.service';
import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/models/Flight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-returning-flights',
  templateUrl: './list-returning-flights.component.html',
  styleUrls: ['./list-returning-flights.component.css']
})
export class ListReturningFlightsComponent implements OnInit {
  flights: Flight[] = this.flightService.returningFlights;

  constructor(private flightService: FlightService,
              private reservationService: ReservationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  select(flight: Flight) {
    this.reservationService.selectedReturningFlight = flight;
    this.router.navigateByUrl('/reservation-summary');
  }

}
