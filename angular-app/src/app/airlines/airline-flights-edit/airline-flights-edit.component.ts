import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-airline-flights-edit',
  templateUrl: './airline-flights-edit.component.html',
  styleUrls: ['./airline-flights-edit.component.css']
})
export class AirlineFlightsEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
