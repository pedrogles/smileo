import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientManagementTableComponent } from './patient-management-table.component';

describe('PatientManagementTableComponent', () => {
  let component: PatientManagementTableComponent;
  let fixture: ComponentFixture<PatientManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientManagementTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
