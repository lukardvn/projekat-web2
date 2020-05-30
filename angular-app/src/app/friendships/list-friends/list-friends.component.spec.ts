import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFriendsComponent } from './list-friends.component';

describe('ListFriendsComponent', () => {
  let component: ListFriendsComponent;
  let fixture: ComponentFixture<ListFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
