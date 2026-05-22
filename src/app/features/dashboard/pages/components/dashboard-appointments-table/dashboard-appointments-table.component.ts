import { Component, inject, OnInit, output } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardAppointmentTableDTO } from '../../../../dashboard/dtos/dashboard-appointment-table.dto';
import { CommonModule, formatDate, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardAppointmentsListComponent } from '../dashboard-appointments-list/dashboard-appointments-list.component';
import { DashboardNextAppointmentComponent } from '../dashboard-next-appointment/dashboard-next-appointment.component';

@Component({
  selector: 'app-dashboard-appointments-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    TitleCasePipe,
    DashboardAppointmentsListComponent,
    DashboardNextAppointmentComponent
  ],
  templateUrl: './dashboard-appointments-table.component.html',
  styleUrl: './dashboard-appointments-table.component.scss'
})
export class DashboardAppointmentsTableComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  appointmentUpdated = output<void>();

  selectedDate: Date = new Date();
  appointments: DashboardAppointmentTableDTO[] = [];
  inProgressAppointments: DashboardAppointmentTableDTO[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadAppointments();
    this.loadInProgressAppointments();
  }

  loadInProgressAppointments(): void {
    this.dashboardService.getInProgressAppointments().subscribe(appointments => {
      this.inProgressAppointments = appointments;
    });
  }

  loadAppointments(): void {
    if (!this.selectedDate) return;
    this.isLoading = true;
    const dateStr = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en');
    this.dashboardService
      .getAppointmentsByDate(dateStr)
      .subscribe(appointments => {
        this.appointments = appointments.filter(a => a.status !== 'in_progress');
        this.isLoading = false;
      });
  }

  onAppointmentUpdated(): void {
    this.loadAppointments();
    this.loadInProgressAppointments();
    this.appointmentUpdated.emit();
  }
}