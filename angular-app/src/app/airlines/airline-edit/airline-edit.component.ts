import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-airline-edit',
  templateUrl: './airline-edit.component.html',
  styleUrls: ['./airline-edit.component.css']
})
export class AirlineEditComponent implements OnInit {

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.airlineService.getMine().subscribe(result => {
      console.log(result);
    }, err=> {
      console.log(err);
    })
  }

}
