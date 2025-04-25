import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertPdfToPowerpointComponent } from './convert-pdf-to-powerpoint.component';

describe('ConvertPDFToPOWERPOINTComponent', () => {
  let component: ConvertPdfToPowerpointComponent;
  let fixture: ComponentFixture<ConvertPdfToPowerpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertPdfToPowerpointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertPdfToPowerpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
