import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reservations-module',
  templateUrl: './reservations-module.component.html',
  styleUrls: ['./reservations-module.component.css']
})
export class ReservationsModalComponent implements OnInit {
  reservations;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.reservations = this.data.reservations;
  }
}