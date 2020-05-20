import { Flight } from './../../../models/Flight';
import { FlightService } from './../../services/flight/flight.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  flights: Array<Flight> = new Array<Flight>();

  constructor(private flightService: FlightService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tripType: ['roundtrip'],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      depart: ['', Validators.required],
      return: ['', Validators.required],
      numberOfAdults: ['1', Validators.required],
      numberOfChildren: ['0', Validators.required],
      class: ['economy', Validators.required]
    });
  }

   showFlights() {
     console.log(this.form.value);

    this.flightService.getFiltered(this.form.value).subscribe(result => {
      this.flights = [...result.data];
       console.log(result);
      }, err=>{
       console.log(err.error);
    });
   }

  get f() { return this.form.controls; }
}
