import { Component, OnInit, Inject } from '@angular/core';
import { DestinationService } from 'src/app/services/destination/destination.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Destination } from 'src/models/Destination';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css']
})
export class AddDestinationComponent implements OnInit {
  destinations;
  selectedDestination: any;
  alreadyContains;;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private destinationService: DestinationService,
              private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.destinationService.getAll().subscribe(result => {
      this.destinations = [...result.data];
    })
  }
  
  addDestination(){
    let airlineDestination = {
      AirlineId: this.data,
      DestinationId: this.selectedDestination.id
    };

    this.airlineService.addDestToAirline(airlineDestination).subscribe((result: any) => {
      if (result.success === false)
        this.alreadyContains = true;
      else
        this.alreadyContains = false;

    }, err => {
      console.log(err);
    })
  }

}
