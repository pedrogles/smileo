import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalRegistrationComponent } from './professional-registration.component';

describe('ProfessionalRegistrationComponent', () => {
  let component: ProfessionalRegistrationComponent;
  let fixture: ComponentFixture<ProfessionalRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
