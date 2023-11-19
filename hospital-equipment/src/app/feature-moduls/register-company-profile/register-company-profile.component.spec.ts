import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyProfileComponent } from './register-company-profile.component';

describe('RegisterCompanyProfileComponent', () => {
  let component: RegisterCompanyProfileComponent;
  let fixture: ComponentFixture<RegisterCompanyProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCompanyProfileComponent]
    });
    fixture = TestBed.createComponent(RegisterCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
