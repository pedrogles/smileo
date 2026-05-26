import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRegistrationFormComponent } from './appointment-registration-form.component';

describe('AppointmentRegistrationFormComponent', () => {
  let component: AppointmentRegistrationFormComponent;
  let fixture: ComponentFixture<AppointmentRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
