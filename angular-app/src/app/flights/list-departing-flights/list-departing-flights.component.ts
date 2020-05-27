import { ReservationService } from './../../services/reservation/reservation.service';
import { FlightService } from './../../services/flight/flight.service';
import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/models/Flight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-departing-flights',
  templateUrl: './list-departing-flights.component.html',
  styleUrls: ['./list-departing-flights.component.css']
})
export class ListDepartingFlightsComponent implements OnInit {
  flights: Flight[] = this.flightService.departingFlights;

  constructor(private flightService: FlightService,
              private reservationService: ReservationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  select(flight: Flight) {
    this.reservationService.selectedDepartingFlight = flight;
    this.router.navigateByUrl('/returning-flights');
  }
}
