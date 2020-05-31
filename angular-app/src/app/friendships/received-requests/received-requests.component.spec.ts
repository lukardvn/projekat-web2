import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedRequestsComponent } from './received-requests.component';

describe('ReceivedRequestsComponent', () => {
  let component: ReceivedRequestsComponent;
  let fixture: ComponentFixture<ReceivedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
