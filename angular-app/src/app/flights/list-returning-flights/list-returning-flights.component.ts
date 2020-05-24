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
              private router: Router) { }

  ngOnInit(): void {
    console.log(this.flights);
  }

  select(id: number) {
    this.flightService.returnId = id;
    this.router.navigateByUrl('/departing-flights');
  }

}
