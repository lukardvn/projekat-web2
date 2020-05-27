import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSummaryComponent } from './reservation-summary.component';

describe('ReservationSummaryComponent', () => {
  let component: ReservationSummaryComponent;
  let fixture: ComponentFixture<ReservationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
