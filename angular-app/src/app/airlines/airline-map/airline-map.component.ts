import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-airline-map',
  templateUrl: './airline-map.component.html',
  styleUrls: ['./airline-map.component.css']
})

export class AirlineMapComponent implements AfterViewInit {
  
  constructor(private airlineService : AirlineService,
              @Inject(MAT_DIALOG_DATA) public data: any) { } //u data se nalazi adresa, treba da pretvorim tu adres u lat i lon i da prikazem marker
  
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.Marker;
  

  ngAfterViewInit(){
    this.mapInitializer();
  } 

  mapInitializer() {
    this.getGeoLocation(this.data).subscribe(result => {
      let lat = result.lat();
      let lng = result.lng();
      this.coordinates = new google.maps.LatLng(lat, lng);
      this.mapOptions = {
          center: this.coordinates,
          zoom: 8
      };
      this.marker = new google.maps.Marker({
        position: this.coordinates,
        map: this.map,
      });

      this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
      //Adding Click event to default marker
      /*this.marker.addListener("click", () => {
        const infoWindow = new google.maps.InfoWindow({
          content: this.marker.getTitle()
        });
        infoWindow.open(this.marker.getMap(), this.marker);
      });*/
      //Adding default marker to map
      this.marker.setMap(this.map);
    });  

    
  }

  getGeoLocation(address: string): Observable<any> {
    //console.log('Getting address: ', address);
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
        geocoder.geocode({
            'address': address
        }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                observer.next(results[0].geometry.location);
                observer.complete();
            } else {
                console.log('Error: ', results, ' & Status: ', status);
                observer.error();
            }
        });
    });
  }
}