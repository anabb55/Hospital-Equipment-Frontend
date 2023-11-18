import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompanyProfileComponent } from './show-company-profile.component';

describe('ShowCompanyProfileComponent', () => {
  let component: ShowCompanyProfileComponent;
  let fixture: ComponentFixture<ShowCompanyProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCompanyProfileComponent]
    });
    fixture = TestBed.createComponent(ShowCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
