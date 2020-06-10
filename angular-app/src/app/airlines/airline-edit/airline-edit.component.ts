import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { Airline } from 'src/models/Airline';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AirlineDestinationsEditComponent } from '../airline-destinations-edit/airline-destinations-edit.component';
import { AirlineFlightsEditComponent } from '../airline-flights-edit/airline-flights-edit.component';
import { AddFlightComponent } from 'src/app/flights/add-flight/add-flight.component';
import { AddDestinationComponent } from 'src/app/destinations/add-destination/add-destination.component';

@Component({
  selector: 'app-airline-edit',
  templateUrl: './airline-edit.component.html',
  styleUrls: ['./airline-edit.component.css']
})
export class AirlineEditComponent implements OnInit {
  airline: any;
  form: FormGroup = new FormGroup({});
  changed: boolean = false;
  
  constructor(private airlineService: AirlineService,
              private fb: FormBuilder,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.generateForm();
    this.airlineService.getMine().subscribe(result => {
      this.airline = result.data;
      this.airlineService.availableAirlineDestinations = result.data.airlineDestinations; //sve destinacije OVE kompanije
      this.populateFields();
    }, err=> {
      console.log(err);
    })
  }

  generateForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  populateFields() {
    this.form.patchValue({
      name: this.airline.name,
      description: this.airline.description,
      address: this.airline.address
    });
  }

  saveChanges() {
    this.setProperties(); 
    this.airlineService.updateSingle(this.airline).subscribe(result => {
      console.log(result);
      if (result.success === true)
        this.changed = true;
      else
        this.changed = false;
    }, err => {
      console.log(err);
    })
  }

  setProperties(){
    this.airline.name = this.form.value.name;
    this.airline.description = this.form.value.description;
    this.airline.address = this.form.value.address;
  }

  // MODALS...
  showDestinationsModal(airlineDestinations){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = airlineDestinations;
    dialogConfig.position = { top: '10%' };

    this.dialog.open(AirlineDestinationsEditComponent, dialogConfig);
  }

  showFlightsModal(flights){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = flights;
    dialogConfig.position = { top: '10%' };

    this.dialog.open(AirlineFlightsEditComponent, dialogConfig);
  }

  showAddFlightModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.position = { top: '10%' };
    dialogConfig.data = this.airline;
    this.dialog.open(AddFlightComponent, dialogConfig);
  }

  showAddDestinationModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.position = { top: '10%' };
    dialogConfig.data = this.airline.id;
    this.dialog.open(AddDestinationComponent, dialogConfig);
  }
}
