import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCompanyComponent } from './one-company.component';

describe('OneCompanyComponent', () => {
  let component: OneCompanyComponent;
  let fixture: ComponentFixture<OneCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneCompanyComponent]
    });
    fixture = TestBed.createComponent(OneCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
