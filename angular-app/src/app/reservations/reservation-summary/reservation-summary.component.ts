import { Router } from '@angular/router';
import { ReservationDto } from './../../../models/ReservationDto';
import { AuthService } from './../../services/auth/auth.service';
import { ReservationService } from './../../services/reservation/reservation.service';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent implements OnInit {
  departingFlight: any;
  returningFlight: any;

  constructor(private reservationService: ReservationService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.departingFlight = this.reservationService.selectedDepartingFlight;
    this.returningFlight = this.reservationService.selectedReturningFlight;
  }

  confirmReservation() {  
    let reservation = new ReservationDto({
      DepartingFlight: this.departingFlight,
      ReturningFlight: this.returningFlight,
      UserId: this.authService.currentUser.nameid
    }); //kontam da ovde proverim koliko ljudi, ako ima jos ljudi, posaljem njima ovu rezervaciju i oni prihvataju ili ne
    
    this.reservationService.addReservation(reservation).subscribe(result => {
      console.log(result.data);  //redirect to next page...
      this.router.navigateByUrl('/reservation-summary/success');
    }, err => {
      console.log(err);
    })
  }
}
