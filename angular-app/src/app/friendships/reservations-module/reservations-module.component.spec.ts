import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsModalComponent } from './reservations-module.component';

describe('ReservationsModuleComponent', () => {
  let component: ReservationsModalComponent;
  let fixture: ComponentFixture<ReservationsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
