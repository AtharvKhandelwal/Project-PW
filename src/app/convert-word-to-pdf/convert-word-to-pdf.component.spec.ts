import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertWORDToPDFComponent } from './convert-word-to-pdf.component';

describe('ConvertWORDToPDFComponent', () => {
  let component: ConvertWORDToPDFComponent;
  let fixture: ComponentFixture<ConvertWORDToPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertWORDToPDFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertWORDToPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
