import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalManagementTableComponent } from './professional-management-table.component';

describe('ProfessionalManagementTableComponent', () => {
  let component: ProfessionalManagementTableComponent;
  let fixture: ComponentFixture<ProfessionalManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalManagementTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});