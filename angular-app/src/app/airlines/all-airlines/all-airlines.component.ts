import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-all-airlines',
  templateUrl: './all-airlines.component.html',
  styleUrls: ['./all-airlines.component.css']
})
export class AllAirlinesComponent implements OnInit {
  airlines;

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.airlineService.getAll().subscribe(result => {
      this.airlines = [...result.data];
    }, err => {
      console.log(err);
    })
  }

}
