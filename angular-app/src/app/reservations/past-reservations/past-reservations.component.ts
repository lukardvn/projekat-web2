import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-past-reservations',
  templateUrl: './past-reservations.component.html',
  styleUrls: ['./past-reservations.component.css']
})
export class PastReservationsComponent implements OnInit {
  reservations;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(result => {
      this.reservations = [...result.data];
    }, err=> {
      console.log(err);
    });
  }

}
