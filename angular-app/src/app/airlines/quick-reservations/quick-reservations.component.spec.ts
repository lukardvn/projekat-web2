import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickReservationsComponent } from './quick-reservations.component';

describe('QuickReservationsComponent', () => {
  let component: QuickReservationsComponent;
  let fixture: ComponentFixture<QuickReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
