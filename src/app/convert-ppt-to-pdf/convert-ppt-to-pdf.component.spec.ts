import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertPptToPdfComponent } from './convert-ppt-to-pdf.component';

describe('ConvertPPTToPDFComponent', () => {
  let component: ConvertPptToPdfComponent;
  let fixture: ComponentFixture<ConvertPptToPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertPptToPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertPptToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
