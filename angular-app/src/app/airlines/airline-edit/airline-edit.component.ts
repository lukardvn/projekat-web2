import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { Airline } from 'src/models/Airline';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-airline-edit',
  templateUrl: './airline-edit.component.html',
  styleUrls: ['./airline-edit.component.css']
})
export class AirlineEditComponent implements OnInit {
  airline: any;
  form: FormGroup = new FormGroup({});
  
  constructor(private airlineService: AirlineService,
              private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.generateForm();
    this.airlineService.getMine().subscribe(result => {
      this.airline = result.data;
      console.log(this.airline);
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
    
    /*this.user = new User({
      ...this.form.value
    });*/
    //this.userService.updateSingle(this.user).subscribe();
  }

  setProperties(){
    this.airline.name = this.form.value.name;
    this.airline.description = this.form.value.description;
    this.airline.address = this.form.value.address;
  }
}
