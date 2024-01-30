import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLoyaltyProgramComponent } from './update-loyalty-program.component';

describe('UpdateLoyaltyProgramComponent', () => {
  let component: UpdateLoyaltyProgramComponent;
  let fixture: ComponentFixture<UpdateLoyaltyProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateLoyaltyProgramComponent]
    });
    fixture = TestBed.createComponent(UpdateLoyaltyProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
