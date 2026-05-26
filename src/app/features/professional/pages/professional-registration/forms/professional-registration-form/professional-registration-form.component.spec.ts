import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalRegistrationFormComponent } from './professional-registration-form.component';

describe('ProfessionalRegistrationFormComponent', () => {
  let component: ProfessionalRegistrationFormComponent;
  let fixture: ComponentFixture<ProfessionalRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});