import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyAdminComponent } from './create-company-admin.component';

describe('CreateCompanyAdminComponent', () => {
  let component: CreateCompanyAdminComponent;
  let fixture: ComponentFixture<CreateCompanyAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanyAdminComponent]
    });
    fixture = TestBed.createComponent(CreateCompanyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
