import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationDto } from 'src/models/ReservationDto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-reservations',
  templateUrl: './quick-reservations.component.html',
  styleUrls: ['./quick-reservations.component.css']
})
export class QuickReservationsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private authService: AuthService,
              private reservationService: ReservationService,
              private router: Router,
              public dialogRef: MatDialogRef<QuickReservationsComponent>) { }
  ngOnInit(): void {
  }

  reserve(flight) {
    let reservation = new ReservationDto({
      DepartingFlight: flight,
      UserId: this.authService.currentUser.nameid
    });

    this.reservationService.addReservation(reservation).subscribe(result => {
      console.log(result.data);  //redirect to next page...
      this.router.navigate(['/reservation-summary/success']);
      this.dialogRef.close();
    }, err => {
      console.log(err);
    })
  }

  
}
