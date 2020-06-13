import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastReservationsComponent } from './past-reservations.component';

describe('PastReservationsComponent', () => {
  let component: PastReservationsComponent;
  let fixture: ComponentFixture<PastReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
