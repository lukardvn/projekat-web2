import { Flight } from './../../../models/Flight';
import { FlightService } from './../../services/flight/flight.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  //departingFlights: Array<Flight> = new Array<Flight>();
  //returningFlights: Array<Flight> = new Array<Flight>();

  constructor(private flightService: FlightService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      tripType: ['roundtrip'],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      depart: ['', Validators.required],
      return: [undefined],
      numberOfAdults: ['1', Validators.required],
      numberOfChildren: ['0', Validators.required],
      class: ['economy', Validators.required]
    });
  }

   showFlights() {
    if (this.f.tripType.value == 'oneway') 
      this.f.return = null; 

    this.flightService.getFiltered(this.form.value).subscribe(result => {
      this.flightService.departingFlights = [...result.data.departingFlights];
      this.flightService.returningFlights = [...result.data.returningFlights];
      this.router.navigateByUrl('/departing-flights');
    }, err=>{
       console.log(err.error);
    });
  }
  
  get f() { return this.form.controls; }
}
