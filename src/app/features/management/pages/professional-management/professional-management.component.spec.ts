import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalManagementComponent } from './professional-management.component';

describe('ProfessionalManagementComponent', () => {
  let component: ProfessionalManagementComponent;
  let fixture: ComponentFixture<ProfessionalManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});