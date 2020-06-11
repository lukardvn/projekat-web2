import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  reservation;
  noTime: boolean = false;

  constructor(private reservationService: ReservationService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.reservationService.getSingle(+id).subscribe(result => {
      this.reservation = result.data;
      console.log(this.reservation);
    })
  }

  cancelReservation(id) {//ovde poziv servisu za brisanje rezervacije iz baze
    console.log(id);
    this.reservationService.cancelReservation(id).subscribe((result:any) => {
      if (result.data === true)
        this.router.navigateByUrl("/list-reservations");     
      else 
        this.noTime = true;
    }, err => {
      console.log(err);
    })
  }

}
