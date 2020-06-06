import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-airline-destinations-edit',
  templateUrl: './airline-destinations-edit.component.html',
  styleUrls: ['./airline-destinations-edit.component.css']
})
export class AirlineDestinationsEditComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    
  }

}
