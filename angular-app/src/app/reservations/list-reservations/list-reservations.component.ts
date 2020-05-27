import { Router } from '@angular/router';
import { Reservation } from './../../../models/Reservation';
import { ReservationService } from './../../services/reservation/reservation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css']
})
export class ListReservationsComponent implements OnInit {
  reservations: Reservation[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(result => {
      this.reservations = [...result.data];
    }, err=> {
      console.log(err);
    });
  }

}
