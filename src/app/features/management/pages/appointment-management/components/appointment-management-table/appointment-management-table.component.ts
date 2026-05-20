import { Component, inject } from '@angular/core';
import { DataTableComponent } from '../../../../../../shared/components/data-table/data-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IAppointment } from '../../../../../../core/interfaces/appointment.interface';
import { ColumnsConfigType } from '../../../../../../core/types/columnsConfig.type';
import { AppointmentManagementService } from '../../../../services/appointment/appointment-management.service';
import { AppointmentTableDTO } from '../../../../dtos/appointment-table.dto';

@Component({
  selector: 'app-appointment-management-table',
  standalone: true,
  imports: [
    DataTableComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './appointment-management-table.component.html',
  styleUrl: './appointment-management-table.component.scss'
})
export class AppointmentManagementTableComponent {
  appointments: AppointmentTableDTO[] = [];
  columnsConfig: ColumnsConfigType[] = [
    { value: 'Paciente', column: 'patient_name', type: 'text' },
    { value: 'Profissional', column: 'professional_name', type: 'text' },
    { value: 'Serviço', column: 'service_name', type: 'text' },
    { value: 'Data', column: 'start_datetime', type: 'text' },
    { value: 'Status', column: 'status', type: 'text' }
  ];

  isLoading = true;

  readonly appointmentManagementService = inject(AppointmentManagementService);

  ngOnInit() {
    this.appointmentManagementService.getAll().subscribe(appointments => {
      console.log(appointments);
      this.appointments = appointments;
      this.isLoading = false;
    });
  }
}
