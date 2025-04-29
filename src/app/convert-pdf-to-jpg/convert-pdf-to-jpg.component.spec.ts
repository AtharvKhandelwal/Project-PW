import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertPdfToJpgComponent } from './convert-pdf-to-jpg.component';

describe('ConvertPdfToJpgComponent', () => {
  let component: ConvertPdfToJpgComponent;
  let fixture: ComponentFixture<ConvertPdfToJpgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertPdfToJpgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertPdfToJpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
