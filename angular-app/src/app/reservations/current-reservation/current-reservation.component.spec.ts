import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentReservationComponent } from './current-reservation.component';

describe('CurrentReservationComponent', () => {
  let component: CurrentReservationComponent;
  let fixture: ComponentFixture<CurrentReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
