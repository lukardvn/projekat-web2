import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReturningFlightsComponent } from './list-returning-flights.component';

describe('ListReturningFlightsComponent', () => {
  let component: ListReturningFlightsComponent;
  let fixture: ComponentFixture<ListReturningFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReturningFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReturningFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
