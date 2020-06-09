import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flight } from 'src/models/Flight';
import { FlightService } from 'src/app/services/flight/flight.service';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  availableDests = this.airlineService.availableAirlineDestinations;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private flightService: FlightService,
              private airlineService: AirlineService) { }

  ngOnInit(): void {
    console.log(this.data);

    this.form = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      takeOffTime: ['', Validators.required],
      landingTime: ['', Validators.required],
      price: ['', Validators.required],
      stops: ['', Validators.required],
      distance: ['', Validators.required],
      seatsLeft: ['', Validators.required]
    });

    console.log(this.availableDests);
  }

  get f() { return this.form.controls; }

  addFlight(){
    if (this.form.valid){
      let newFlight = new Flight({
        ...this.form.value,
        Airline: this.data
      });
  
      console.log(newFlight);
      this.flightService.addFlight(newFlight).subscribe(result => {
        console.log(result);
      }, err => {
        console.log(err);
      })
    }

    
  }
}
