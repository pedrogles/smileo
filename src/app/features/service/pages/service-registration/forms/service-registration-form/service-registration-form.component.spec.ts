import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRegistrationFormComponent } from './service-registration-form.component';

describe('ServiceRegistrationFormComponent', () => {
  let component: ServiceRegistrationFormComponent;
  let fixture: ComponentFixture<ServiceRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRegistrationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
