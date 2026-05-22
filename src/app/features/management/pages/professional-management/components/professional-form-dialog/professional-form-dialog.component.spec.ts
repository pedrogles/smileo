import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalFormDialogComponent } from './professional-form-dialog.component';

describe('ProfessionalFormDialogComponent', () => {
  let component: ProfessionalFormDialogComponent;
  let fixture: ComponentFixture<ProfessionalFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
