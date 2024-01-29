import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAppointmentComponent } from './admin-add-appointment.component';

describe('AdminAddAppointmentComponent', () => {
  let component: AdminAddAppointmentComponent;
  let fixture: ComponentFixture<AdminAddAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddAppointmentComponent]
    });
    fixture = TestBed.createComponent(AdminAddAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
