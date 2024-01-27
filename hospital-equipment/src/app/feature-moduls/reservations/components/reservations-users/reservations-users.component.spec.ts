import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsUsersComponent } from './reservations-users.component';

describe('ReservationsUsersComponent', () => {
  let component: ReservationsUsersComponent;
  let fixture: ComponentFixture<ReservationsUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsUsersComponent]
    });
    fixture = TestBed.createComponent(ReservationsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
