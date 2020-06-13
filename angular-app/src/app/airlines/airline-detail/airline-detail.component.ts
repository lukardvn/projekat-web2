import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AirlineMapComponent } from '../airline-map/airline-map.component';
import { AirlineDestinationsEditComponent } from '../airline-destinations-edit/airline-destinations-edit.component';
import { AirlineFlightsEditComponent } from '../airline-flights-edit/airline-flights-edit.component';
import { QuickReservationsComponent } from '../quick-reservations/quick-reservations.component';

@Component({
  selector: 'app-airline-detail',
  templateUrl: './airline-detail.component.html',
  styleUrls: ['./airline-detail.component.css']
})
export class AirlineDetailComponent implements OnInit {
  airline;
  quickFlights;
  avgRating = 0;
  constructor(private airlineService: AirlineService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');  
    this.airlineService.getSingle(+id).subscribe(result => {
      this.airline = result.data;
      let sumRatings = 0;
      let numOfReviews = 0;

      this.airline.flights.forEach(element => {
        if (element.reviews.length > 0){
          numOfReviews = numOfReviews + element.reviews.length;
          element.reviews.forEach(rev => {
            sumRatings = sumRatings + rev.rating;
          });
        }
      });

      this.avgRating = sumRatings / numOfReviews;
    })
  }

  showMapModal(address){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = address;
    this.dialog.open(AirlineMapComponent, dialogConfig);
  }

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

  showQuickReservationsModal(flights) {   
    flights = flights.filter(flight => flight.quickReservation === true);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = flights;
    dialogConfig.position = { top: '10%' };

    this.dialog.open(QuickReservationsComponent, dialogConfig);
  }
}