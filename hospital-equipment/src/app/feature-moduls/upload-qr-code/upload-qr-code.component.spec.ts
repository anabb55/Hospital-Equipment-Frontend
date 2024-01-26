import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadQrCodeComponent } from './upload-qr-code.component';

describe('UploadQrCodeComponent', () => {
  let component: UploadQrCodeComponent;
  let fixture: ComponentFixture<UploadQrCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadQrCodeComponent]
    });
    fixture = TestBed.createComponent(UploadQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
