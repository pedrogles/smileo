import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAppointmentsTableComponent } from './dashboard-appointments-table.component';

describe('DashboardAppointmentsTableComponent', () => {
  let component: DashboardAppointmentsTableComponent;
  let fixture: ComponentFixture<DashboardAppointmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAppointmentsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAppointmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});