import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentManagementTableComponent } from './appointment-management-table.component';

describe('AppointmentManagementTableComponent', () => {
  let component: AppointmentManagementTableComponent;
  let fixture: ComponentFixture<AppointmentManagementTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentManagementTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
