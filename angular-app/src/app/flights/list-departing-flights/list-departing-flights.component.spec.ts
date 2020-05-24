import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartingFlightsComponent } from './list-departing-flights.component';

describe('ListDepartingFlightsComponent', () => {
  let component: ListDepartingFlightsComponent;
  let fixture: ComponentFixture<ListDepartingFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDepartingFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDepartingFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
