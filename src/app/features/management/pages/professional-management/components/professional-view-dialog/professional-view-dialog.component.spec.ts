import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalViewDialogComponent } from './professional-view-dialog.component';

describe('ProfessionalViewDialogComponent', () => {
  let component: ProfessionalViewDialogComponent;
  let fixture: ComponentFixture<ProfessionalViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalViewDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
