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
              private router: Router) { }

  ngOnInit(): void {
    console.log(this.flights);
  }

  select(id: number) {
    this.flightService.departId = id;
    this.router.navigateByUrl('/returning-flights');
  }

}
