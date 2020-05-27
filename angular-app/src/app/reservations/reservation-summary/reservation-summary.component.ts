import { Flight } from './../../../models/Flight';
import { ReservationDto } from './../../../models/ReservationDto';
import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../../models/User';
import { Reservation } from './../../../models/Reservation';
import { ReservationService } from './../../services/reservation/reservation.service';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent implements OnInit {
  departingFlight;
  returningFlight;
  confirmed = false;

  constructor(private reservationService: ReservationService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.departingFlight = this.reservationService.selectedDepartingFlight;
    this.returningFlight = this.reservationService.selectedReturningFlight;
  }

  confirmReservation() {
    let reservation = new ReservationDto({
      DepartingFlight: this.departingFlight,
      ReturningFlight: this.returningFlight,
      UserId: this.authService.currentUser.nameid
    })
    
    this.reservationService.addReservation(reservation).subscribe(result => {
      this.confirmed = true;
      console.log(result);  //redirect to next page...
    }, error => {
      console.log(error);
    })
  }
}
