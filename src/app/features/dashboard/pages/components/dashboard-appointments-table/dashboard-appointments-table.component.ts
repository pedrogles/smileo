import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardAppointmentTableDTO } from '../../../../dashboard/dtos/dashboard-appointment-table.dto';
import { ColumnsConfigType } from '../../../../../core/types/columnsConfig.type';
import { CommonModule, formatDate, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';

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
    MatCardModule,
    MatIconModule,
    TitleCasePipe,
    DataTableComponent
  ],
  templateUrl: './dashboard-appointments-table.component.html',
  styleUrl: './dashboard-appointments-table.component.scss'
})
export class DashboardAppointmentsTableComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  selectedDate: Date = new Date();
  appointments: DashboardAppointmentTableDTO[] = [];
  nextAppointment: DashboardAppointmentTableDTO | null = null;

  appointmentsWithStatus: any[] = [];

  columnsConfig: ColumnsConfigType[] = [
    { value: 'Horário', column: 'start_datetime', type: 'text' },
    { value: 'Paciente', column: 'patient_name', type: 'text' },
    { value: 'Profissional', column: 'professional_name', type: 'text' },
    { value: 'Serviço', column: 'service_name', type: 'text' },
    { value: 'Status', column: 'status_label', type: 'text' },
    { value: 'Obs.', column: 'notes', type: 'text' }
  ];

  isLoading = true;

  private readonly statusLabels: Record<string, string> = {
    scheduled: 'Agendado',
    in_progress: 'Em andamento',
    completed: 'Concluído',
    canceled: 'Cancelado'
  };

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    if (!this.selectedDate) return;
    this.isLoading = true;
    const dateStr = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en');
    this.dashboardService
      .getAppointmentsByDate(dateStr)
      .subscribe(appointments => {
        this.appointments = appointments;
        this.appointmentsWithStatus = appointments.map(a => ({
          ...a,
          status_label: this.statusLabels[a.status] ?? a.status
        }));
        this.nextAppointment = this.getNextAppointment(appointments);
        this.isLoading = false;
      });
  }

  private getNextAppointment(appointments: DashboardAppointmentTableDTO[]): DashboardAppointmentTableDTO | null {
    const now = new Date();
    const isToday = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en') === formatDate(now, 'yyyy-MM-dd', 'en');
    if (!isToday) return appointments[0] ?? null;
    return appointments.find(a =>
      a.status === 'scheduled' || a.status === 'in_progress'
    ) ?? null;
  }
}