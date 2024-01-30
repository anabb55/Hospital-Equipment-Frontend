import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoyaltyProgramComponent } from './create-loyalty-program.component';

describe('CreateLoyaltyProgramComponent', () => {
  let component: CreateLoyaltyProgramComponent;
  let fixture: ComponentFixture<CreateLoyaltyProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLoyaltyProgramComponent]
    });
    fixture = TestBed.createComponent(CreateLoyaltyProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
