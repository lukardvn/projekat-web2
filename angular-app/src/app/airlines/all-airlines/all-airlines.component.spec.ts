import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAirlinesComponent } from './all-airlines.component';

describe('AllAirlinesComponent', () => {
  let component: AllAirlinesComponent;
  let fixture: ComponentFixture<AllAirlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAirlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAirlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
