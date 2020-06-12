import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineMapComponent } from './airline-map.component';

describe('AirlineMapComponent', () => {
  let component: AirlineMapComponent;
  let fixture: ComponentFixture<AirlineMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
