import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineFlightsEditComponent } from './airline-flights-edit.component';

describe('AirlineFlightsEditComponent', () => {
  let component: AirlineFlightsEditComponent;
  let fixture: ComponentFixture<AirlineFlightsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineFlightsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFlightsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
