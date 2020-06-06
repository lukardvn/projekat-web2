import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineDestinationsEditComponent } from './airline-destinations-edit.component';

describe('AirlineDestinationsEditComponent', () => {
  let component: AirlineDestinationsEditComponent;
  let fixture: ComponentFixture<AirlineDestinationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineDestinationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineDestinationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
