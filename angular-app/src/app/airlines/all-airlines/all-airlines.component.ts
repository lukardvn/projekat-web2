import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AirlineMapComponent } from '../airline-map/airline-map.component';

@Component({
  selector: 'app-all-airlines',
  templateUrl: './all-airlines.component.html',
  styleUrls: ['./all-airlines.component.css']
})
export class AllAirlinesComponent implements OnInit {
  airlines;

  constructor(private airlineService: AirlineService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.airlineService.getAll().subscribe(result => {
      this.airlines = [...result.data];
    }, err => {
      console.log(err);
    })
  }

  showMapModal(address) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = address;
    this.dialog.open(AirlineMapComponent, dialogConfig);
  }

}
